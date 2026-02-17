"use client"

import React, { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from "react"
import * as planck from "planck"
import profiles from "@/lib/fake-profiles"

const ACCENT = "#5885ec"
const SCALE = 30
const NODE_RADIUS = 0.25
const YOU_NODE_RADIUS = 0.5
const REPULSION_RADIUS = 1.4
const REPULSION_FORCE = 10
const CENTER_FORCE = 0.9
const MIN_ZOOM = 0.35
const MAX_ZOOM = 4.0
const HOVER_PUSH_RADIUS = 2.0
const HOVER_SCALE = 1.7
const FADE_LERP = 0.08
const FADE_MIN = 0.45

interface NodeData {
  id: string
  name: string
  photoUrl: string
  x: number
  y: number
  body?: planck.Body
  connectionCount: number
  isYou?: boolean
  title?: string
  company?: string
  industry?: string
}

export interface NetworkCanvasHandle {
  simulateQuery: (query: string) => void
}

interface Props {
  centerNodeLabel: string
}

const NetworkCanvas = forwardRef<NetworkCanvasHandle, Props>(function NetworkCanvas({ centerNodeLabel }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    world: null as planck.World | null,
    ground: null as planck.Body | null,
    nodes: [] as NodeData[],
    draggedNode: null as NodeData | null,
    hoveredNode: null as NodeData | null,
    mouseJoint: null as planck.MouseJoint | null,
    animationId: 0,
    mousePos: null as { x: number; y: number } | null,
    nodeImages: new Map<string, CanvasImageSource>(),
    canvasSize: { w: 800, h: 600 },
    nodeOpacity: new Map<string, number>(),
    searchMatchedIds: new Set<string>(),
    isPaused: false,
    zoom: 1,
    pan: { x: 0, y: 0 },
    lastPinchDist: null as number | null,
    centerLabel: centerNodeLabel,
  })

  // Keep label in sync
  useEffect(() => { stateRef.current.centerLabel = centerNodeLabel }, [centerNodeLabel])

  const toWorld = useCallback((px: number, py: number) => {
    const s = stateRef.current
    return planck.Vec2((px - s.pan.x) / (SCALE * s.zoom), (py - s.pan.y) / (SCALE * s.zoom))
  }, [])

  const toPixel = useCallback((wx: number, wy: number) => {
    const s = stateRef.current
    return { x: wx * SCALE * s.zoom + s.pan.x, y: wy * SCALE * s.zoom + s.pan.y }
  }, [])

  useImperativeHandle(ref, () => ({
    simulateQuery(query: string) {
      const s = stateRef.current
      const trimmed = query.trim().toLowerCase()
      if (!trimmed) {
        s.searchMatchedIds = new Set()
        return
      }
      const stopWords = new Set(["who", "do", "i", "know", "that", "works", "at", "in", "find", "me", "the", "a", "an", "my", "is", "are", "for", "of", "and", "or", "to", "with"])
      const keywords = trimmed.split(/\s+/).filter(w => !stopWords.has(w))
      if (keywords.length === 0) {
        s.searchMatchedIds = new Set()
        return
      }
      const matched = new Set<string>()
      for (const node of s.nodes) {
        if (node.isYou) continue
        const fields = [node.name, node.title, node.company, node.industry].map(f => (f || "").toLowerCase())
        for (const kw of keywords) {
          if (fields.some(f => f.includes(kw))) {
            matched.add(node.id)
            break
          }
        }
      }
      s.searchMatchedIds = matched
    },
  }))

  // Single effect: init + render loop + cleanup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const s = stateRef.current

    const parent = canvas.parentElement
    const cw = parent ? parent.clientWidth : window.innerWidth
    const ch = parent ? parent.clientHeight : window.innerHeight
    s.canvasSize = { w: cw, h: ch }
    const centerX = cw / 2, centerY = ch / 2

    // --- Create physics world ---
    const world = planck.World({ gravity: planck.Vec2(0, 0) })
    s.world = world
    const ground = world.createBody()
    s.ground = ground

    // --- Build nodes — scale count with screen size ---
    const screenArea = cw * ch
    const maxNodes = Math.min(155, Math.max(20, Math.round(screenArea / 6000)))
    const nodeProfiles = profiles.slice(0, maxNodes)

    const nodeDataList: Omit<NodeData, "body">[] = []
    nodeDataList.push({
      id: "you", name: "YOU", photoUrl: "",
      x: centerX, y: centerY, isYou: true, connectionCount: 0,
    })

    const maxRadius = Math.min(160, 15 + nodeProfiles.length * 0.35)
    nodeProfiles.forEach((prof, i) => {
      const angle = i * 2.39996323
      const radius = 10 + Math.random() * (maxRadius - 10)
      nodeDataList.push({
        id: prof.id, name: prof.name,
        photoUrl: prof.avatarUrl,
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 10,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 10,
        title: prof.title, company: prof.company, industry: prof.industry,
        connectionCount: 0,
      })
    })

    const nodes: NodeData[] = nodeDataList.map((node) => {
      const isYou = node.isYou === true
      const body = world.createDynamicBody({
        position: toWorld(node.x, node.y),
        linearDamping: isYou ? 6 : 5,
        angularDamping: 0.5,
      })
      body.createFixture({
        shape: planck.Circle(isYou ? YOU_NODE_RADIUS : NODE_RADIUS),
        density: isYou ? 8 : 3,
        friction: 0.3,
        restitution: 0.2,
      })
      return { ...node, body }
    })
    s.nodes = nodes

    // --- Auto-zoom ---
    if (nodes.length > 1) {
      let mnX = Infinity, mxX = -Infinity, mnY = Infinity, mxY = -Infinity
      nodes.forEach(n => {
        if (!n.body) return
        const pos = n.body.getPosition()
        const px = pos.x * SCALE, py = pos.y * SCALE
        if (px < mnX) mnX = px; if (px > mxX) mxX = px
        if (py < mnY) mnY = py; if (py > mxY) mxY = py
      })
      const sw = mxX - mnX + 10, sh = mxY - mnY + 10
      const fz = Math.max(cw / sw, ch / sh) * 1.5
      s.zoom = Math.max(MIN_ZOOM, Math.min(fz, MAX_ZOOM))
      const midX = (mnX + mxX) / 2 * s.zoom
      const midY = (mnY + mxY) / 2 * s.zoom
      s.pan = { x: cw / 2 - midX, y: ch / 2 - midY }
    }

    // --- Generate fallback avatar (initials) ---
    const generateFallbackAvatar = (name: string, size: number): HTMLCanvasElement => {
      const offscreen = document.createElement("canvas")
      offscreen.width = size; offscreen.height = size
      const octx = offscreen.getContext("2d")
      if (!octx) return offscreen
      let hash = 0
      for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
      const hue = ((hash % 360) + 360) % 360
      octx.fillStyle = `hsl(${hue}, 55%, 62%)`
      octx.beginPath(); octx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); octx.fill()
      const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
      octx.fillStyle = "#fff"
      octx.font = `600 ${size * 0.4}px sans-serif`
      octx.textAlign = "center"; octx.textBaseline = "middle"
      octx.fillText(initials, size / 2, size / 2 + 1)
      return offscreen
    }

    // --- Load dicebear avatars with fallback ---
    nodeDataList.forEach((node) => {
      if (node.isYou) return
      // Set fallback immediately so nodes render right away
      s.nodeImages.set(node.id, generateFallbackAvatar(node.name, 64))
      // Load dicebear SVG
      if (node.photoUrl) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => { s.nodeImages.set(node.id, img) }
        img.src = node.photoUrl
      }
    })

    // --- Canvas setup ---
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resizeCanvas = () => {
      const p = canvas.parentElement
      const w = p ? p.clientWidth : window.innerWidth
      const h = p ? p.clientHeight : window.innerHeight
      s.canvasSize = { w, h }
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // --- Intersection observer ---
    const obs = new IntersectionObserver(([e]) => { s.isPaused = !e.isIntersecting }, { threshold: 0.1 })
    obs.observe(canvas)

    const getCenter = () => toWorld(s.canvasSize.w / 2, s.canvasSize.h / 2)

    // --- Forces ---
    const applyCenterForce = () => {
      const center = getCenter()
      const cx = center.x, cy = center.y
      for (const node of s.nodes) {
        if (!node.body) continue
        const pos = node.body.getPosition()
        const mult = node.isYou ? 10 : CENTER_FORCE
        node.body.applyForceToCenter(planck.Vec2((cx - pos.x) * mult, (cy - pos.y) * mult), true)
      }
    }

    // Spatial grid for O(n) repulsion instead of O(n²)
    const GRID_CELL = REPULSION_RADIUS
    const gridMap = new Map<string, number[]>()
    const gridKey = (cx: number, cy: number) => `${cx},${cy}`

    const applyRepulsion = () => {
      const ns = s.nodes
      gridMap.clear()

      // Insert nodes into grid cells
      for (let i = 0; i < ns.length; i++) {
        const b = ns[i].body
        if (!b) continue
        const pos = b.getPosition()
        const cx = Math.floor(pos.x / GRID_CELL), cy = Math.floor(pos.y / GRID_CELL)
        const key = gridKey(cx, cy)
        const cell = gridMap.get(key)
        if (cell) cell.push(i); else gridMap.set(key, [i])
      }

      // Check only neighboring cells
      for (let i = 0; i < ns.length; i++) {
        const nA = ns[i]
        if (!nA.body) continue
        const posA = nA.body.getPosition()
        const cx = Math.floor(posA.x / GRID_CELL), cy = Math.floor(posA.y / GRID_CELL)

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const cell = gridMap.get(gridKey(cx + dx, cy + dy))
            if (!cell) continue
            for (const j of cell) {
              if (j <= i) continue
              const nB = ns[j]
              if (!nB.body) continue
              const posB = nB.body.getPosition()
              const diffX = posB.x - posA.x, diffY = posB.y - posA.y
              const distSq = diffX * diffX + diffY * diffY
              if (distSq >= REPULSION_RADIUS * REPULSION_RADIUS || distSq < 0.0001) continue
              const distance = Math.sqrt(distSq)
              const force = (REPULSION_FORCE * (REPULSION_RADIUS - distance)) / distance
              const fx = -force * diffX / distance, fy = -force * diffY / distance
              nA.body.applyForceToCenter(planck.Vec2(fx, fy), true)
              nB.body.applyForceToCenter(planck.Vec2(-fx, -fy), true)
            }
          }
        }
      }
    }

    const applyHoverRepulsion = (hovered: NodeData) => {
      if (!hovered.body) return
      const hPos = hovered.body.getPosition()
      const hx = hPos.x, hy = hPos.y
      for (const node of s.nodes) {
        if (!node.body || node.id === hovered.id) continue
        const nPos = node.body.getPosition()
        const dx = nPos.x - hx, dy = nPos.y - hy
        const distSq = dx * dx + dy * dy
        if (distSq >= HOVER_PUSH_RADIUS * HOVER_PUSH_RADIUS || distSq < 0.0001) continue
        const dist = Math.sqrt(distSq)
        const push = (HOVER_PUSH_RADIUS - dist) * 12 / dist
        node.body.applyForceToCenter(planck.Vec2(push * dx / dist, push * dy / dist), true)
      }
    }

    const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }

    const FONT = '"HelveticaNeueLTPro-Bd", "Helvetica Neue", Helvetica, Arial, sans-serif'

    // Pre-sort: YOU node last so it renders on top
    const sortedNodes = [...nodes].sort((a, b) => {
      if (a.isYou) return 1; if (b.isYou) return -1; return 0
    })

    // --- Render loop ---
    let running = true
    const render = () => {
      if (!running) return
      if (s.isPaused) { s.animationId = requestAnimationFrame(render); return }

      const { w: cw2, h: ch2 } = s.canvasSize

      // Hover detection
      const mousePos = s.mousePos
      let hoveredNode: NodeData | null = null
      if (mousePos) {
        const mouseWorld = toWorld(mousePos.x, mousePos.y)
        for (const node of s.nodes) {
          if (!node.body) continue
          if (planck.Vec2.distance(node.body.getPosition(), mouseWorld) < NODE_RADIUS * 2.5) {
            hoveredNode = node; break
          }
        }
      }
      s.hoveredNode = hoveredNode

      applyCenterForce()
      applyRepulsion()
      if (hoveredNode && !s.draggedNode) applyHoverRepulsion(hoveredNode)
      world.step(1 / 60)

      if (s.draggedNode) canvas.style.cursor = "grabbing"
      else if (hoveredNode) canvas.style.cursor = "pointer"
      else canvas.style.cursor = "default"

      ctx.clearRect(0, 0, cw2, ch2)

      const activeNode = s.draggedNode || hoveredNode
      const searchIds = s.searchMatchedIds

      // Draw search edges
      if (searchIds.size > 0) {
        const youNode = s.nodes.find(n => n.isYou)
        if (youNode?.body) {
          const youPos = youNode.body.getPosition()
          const youPx = toPixel(youPos.x, youPos.y)
          for (const matchId of searchIds) {
            const matchNode = s.nodes.find(n => n.id === matchId)
            if (!matchNode?.body) continue
            const mPos = matchNode.body.getPosition()
            const mPx = toPixel(mPos.x, mPos.y)
            const dist = planck.Vec2.distance(youPos, mPos)
            const alpha = Math.max(0.15, 0.5 - dist * 0.02)

            ctx.save()
            ctx.strokeStyle = `rgba(88,133,236,${alpha * 0.4})`
            ctx.lineWidth = 3 * s.zoom
            ctx.beginPath(); ctx.moveTo(youPx.x, youPx.y); ctx.lineTo(mPx.x, mPx.y); ctx.stroke()
            ctx.restore()

            ctx.strokeStyle = `rgba(88,133,236,${alpha})`
            ctx.lineWidth = 1.2 * s.zoom
            ctx.beginPath(); ctx.moveTo(youPx.x, youPx.y); ctx.lineTo(mPx.x, mPx.y); ctx.stroke()

            const diff = planck.Vec2.sub(youPos, mPos)
            const len = diff.length()
            if (len > 0.5) {
              matchNode.body.applyForceToCenter(planck.Vec2.mul(diff, 0.08), true)
            }
          }
        }
      }

      const maxConn = Math.max(...s.nodes.map(n => n.connectionCount || 0), 1)

      sortedNodes.forEach((node) => {
        if (!node.body) return
        const pos = node.body.getPosition()
        const p = toPixel(pos.x, pos.y)

        // Skip offscreen
        if (p.x < -60 || p.x > cw2 + 60 || p.y < -60 || p.y > ch2 + 60) return

        const isActive = activeNode && node.id === activeNode.id
        const isYou = node.isYou === true
        const isHovered = hoveredNode && node.id === hoveredNode.id
        const connRatio = (node.connectionCount || 0) / Math.max(maxConn, 1)
        const baseRadius = isYou ? 12 * s.zoom : (6 + connRatio * 3) * s.zoom
        const radius = baseRadius * (isHovered && !isYou ? HOVER_SCALE : 1)

        const isSearchMatch = searchIds.size > 0 && searchIds.has(node.id)

        let targetOpacity = 1
        let borderColor = "#9ca3af"
        let borderWidth = isYou ? 2.5 : 1

        if (isSearchMatch) { borderColor = ACCENT; borderWidth = 2.5 }
        if (activeNode) {
          if (isActive) { borderColor = ACCENT; borderWidth = isYou ? 3 : 2 }
          else { targetOpacity = FADE_MIN; borderColor = "rgba(0,0,0,0.1)"; borderWidth = isYou ? 1 : 0.5 }
        }
        if (isSearchMatch) { targetOpacity = 1; borderColor = ACCENT; borderWidth = 2.5 }

        const prevOpacity = s.nodeOpacity.get(node.id) ?? 1
        const opacity = prevOpacity + (targetOpacity - prevOpacity) * FADE_LERP
        s.nodeOpacity.set(node.id, opacity)

        if (isSearchMatch && !isYou) {
          ctx.save(); ctx.globalAlpha = 0.25
          ctx.beginPath(); ctx.arc(p.x, p.y, radius + 5 * s.zoom, 0, Math.PI * 2)
          ctx.fillStyle = ACCENT; ctx.fill(); ctx.restore()
        }

        if (isYou && opacity > 0.5) {
          ctx.save(); ctx.globalAlpha = 0.12
          ctx.beginPath(); ctx.arc(p.x, p.y, radius + 6 * s.zoom, 0, Math.PI * 2)
          ctx.fillStyle = ACCENT; ctx.fill(); ctx.restore()
        }

        const img = s.nodeImages.get(node.id)
        if (img) {
          ctx.save(); ctx.globalAlpha = opacity
          ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI * 2); ctx.closePath(); ctx.clip()
          ctx.drawImage(img, p.x - radius, p.y - radius, radius * 2, radius * 2)
          ctx.restore()
          ctx.save(); ctx.globalAlpha = opacity; ctx.strokeStyle = borderColor; ctx.lineWidth = borderWidth
          ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI * 2); ctx.stroke(); ctx.restore()
        } else {
          ctx.save(); ctx.globalAlpha = opacity
          ctx.fillStyle = isYou ? ACCENT : "#9ca3af"
          ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI * 2); ctx.fill()
          ctx.strokeStyle = borderColor; ctx.lineWidth = borderWidth; ctx.stroke(); ctx.restore()
          if (radius > 5) {
            ctx.save(); ctx.globalAlpha = opacity; ctx.fillStyle = "#ffffff"
            ctx.font = `600 ${Math.max(6, radius * 0.75)}px ${FONT}`
            ctx.textAlign = "center"; ctx.textBaseline = "middle"
            ctx.fillText(isYou ? "🫵" : node.name.charAt(0).toUpperCase(), p.x, p.y); ctx.restore()
          }
        }

        if (isYou) {
          ctx.save(); ctx.globalAlpha = 1
          const label = s.centerLabel
          const fs = Math.max(10, 12 * s.zoom)
          ctx.font = `600 ${fs}px ${FONT}`
          ctx.textAlign = "center"; ctx.textBaseline = "top"
          const textY = p.y + radius + 5 * s.zoom
          const tw = ctx.measureText(label).width
          const padV = 4 * s.zoom
          const bw = tw + padV * 2, bh = fs + padV
          const bx = p.x - bw / 2, by = textY - padV / 2
          ctx.fillStyle = ACCENT; drawRoundedRect(bx, by, bw, bh, 3 * s.zoom); ctx.fill()
          ctx.fillStyle = "#ffffff"; ctx.fillText(label, p.x, textY); ctx.restore()
        }
      })

      // Hover tooltip
      const hNode = s.hoveredNode
      if (hNode && !hNode.isYou && !s.draggedNode && hNode.body) {
        const hPos = hNode.body.getPosition()
        const hPx = toPixel(hPos.x, hPos.y)
        const hRadius = (11 + ((hNode.connectionCount || 0) / Math.max(maxConn, 1)) * 5) * s.zoom * HOVER_SCALE
        const nameText = hNode.name || "", titleText = hNode.title || "", companyText = hNode.company || ""

        ctx.font = `600 12px ${FONT}`
        const nameW = ctx.measureText(nameText).width
        ctx.font = `400 11px ${FONT}`
        const titleW = ctx.measureText(titleText).width
        const companyW = ctx.measureText(companyText).width

        const padding = 12, lineH = 16
        let lineCount = 1
        if (titleText) lineCount++; if (companyText) lineCount++
        const contentW = Math.max(nameW, titleW, companyW)
        const ttW = contentW + padding * 2, ttH = lineCount * lineH + padding * 1.5

        let ttX = hPx.x - ttW / 2, ttY = hPx.y - hRadius - ttH - 10
        ttX = Math.max(4, Math.min(ttX, cw2 - ttW - 4))
        if (ttY < 4) ttY = hPx.y + hRadius + 10

        ctx.save(); ctx.shadowColor = "rgba(0,0,0,0.12)"; ctx.shadowBlur = 16; ctx.shadowOffsetY = 4
        ctx.fillStyle = "#ffffff"; drawRoundedRect(ttX, ttY, ttW, ttH, 8); ctx.fill(); ctx.restore()
        ctx.strokeStyle = "rgba(88,133,236,0.15)"; ctx.lineWidth = 1
        drawRoundedRect(ttX, ttY, ttW, ttH, 8); ctx.stroke()

        let ty = ttY + padding
        ctx.textAlign = "left"; ctx.textBaseline = "top"
        ctx.font = `600 12px ${FONT}`; ctx.fillStyle = "#1a1a1a"
        ctx.fillText(nameText, ttX + padding, ty); ty += lineH
        if (titleText) {
          ctx.font = `400 11px ${FONT}`; ctx.fillStyle = "#6b7280"
          ctx.fillText(titleText, ttX + padding, ty); ty += lineH
        }
        if (companyText) {
          ctx.font = `400 11px ${FONT}`; ctx.fillStyle = ACCENT
          ctx.fillText(companyText, ttX + padding, ty)
        }
      }

      s.animationId = requestAnimationFrame(render)
    }
    render()

    // --- Cleanup ---
    return () => {
      running = false
      cancelAnimationFrame(s.animationId)
      window.removeEventListener("resize", resizeCanvas)
      obs.disconnect()
    }
  }, [toWorld, toPixel]) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Mouse handlers ──────────────────────────────────────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const s = stateRef.current
    const canvas = canvasRef.current
    if (!canvas || !s.world || !s.ground) return
    const rect = canvas.getBoundingClientRect()
    const mw = toWorld(e.clientX - rect.left, e.clientY - rect.top)
    for (const node of s.nodes) {
      if (!node.body) continue
      if (planck.Vec2.distance(node.body.getPosition(), mw) < NODE_RADIUS * 2.5) {
        s.draggedNode = node
        const j = s.world.createJoint(planck.MouseJoint({
          bodyA: s.ground, bodyB: node.body, target: mw,
          maxForce: 5000 * node.body.getMass(), frequencyHz: 5, dampingRatio: 0.9,
        }))
        s.mouseJoint = j as planck.MouseJoint; break
      }
    }
  }, [toWorld])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const s = stateRef.current
    s.mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    if (s.mouseJoint) s.mouseJoint.setTarget(toWorld(e.clientX - rect.left, e.clientY - rect.top))
  }, [toWorld])

  const handleMouseLeave = useCallback(() => {
    const s = stateRef.current
    s.mousePos = null
    if (s.world && s.mouseJoint) s.world.destroyJoint(s.mouseJoint)
    s.mouseJoint = null; s.draggedNode = null
  }, [])

  const handleMouseUp = useCallback(() => {
    const s = stateRef.current
    if (s.world && s.mouseJoint) s.world.destroyJoint(s.mouseJoint)
    s.mouseJoint = null; s.draggedNode = null
  }, [])

  const handleWheel = useCallback((_e: React.WheelEvent<HTMLCanvasElement>) => { }, [])

  // Native touch handlers (non-passive) so preventDefault works on mobile
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onTouchStart = (e: TouchEvent) => {
      const s = stateRef.current
      if (e.touches.length === 2) {
        e.preventDefault()
        const dx = e.touches[0].clientX - e.touches[1].clientX, dy = e.touches[0].clientY - e.touches[1].clientY
        s.lastPinchDist = Math.sqrt(dx * dx + dy * dy); return
      }
      const t = e.touches[0]
      if (!s.world || !s.ground || !t) return
      const rect = canvas.getBoundingClientRect()
      const tw2 = toWorld(t.clientX - rect.left, t.clientY - rect.top)
      // On touch devices, only the center "YOU" node is grabbable
      const youNode = s.nodes.find(n => n.isYou)
      if (youNode?.body && planck.Vec2.distance(youNode.body.getPosition(), tw2) < YOU_NODE_RADIUS * 3) {
        e.preventDefault()
        s.draggedNode = youNode
        const j = s.world.createJoint(planck.MouseJoint({
          bodyA: s.ground, bodyB: youNode.body, target: tw2,
          maxForce: 5000 * youNode.body.getMass(), frequencyHz: 5, dampingRatio: 0.9,
        }))
        s.mouseJoint = j as planck.MouseJoint
      }
      // If not touching the YOU node, don't preventDefault — allow native scroll
    }

    const onTouchMove = (e: TouchEvent) => {
      const s = stateRef.current
      if (e.touches.length === 2) {
        e.preventDefault()
        const rect = canvas.getBoundingClientRect()
        const dx = e.touches[0].clientX - e.touches[1].clientX, dy = e.touches[0].clientY - e.touches[1].clientY
        const cd = Math.sqrt(dx * dx + dy * dy)
        const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left
        const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top
        if (s.lastPinchDist !== null) {
          const nz = Math.min(Math.max(s.zoom * cd / s.lastPinchDist, MIN_ZOOM), MAX_ZOOM)
          const zc = nz / s.zoom
          s.pan = { x: cx - (cx - s.pan.x) * zc, y: cy - (cy - s.pan.y) * zc }
          s.zoom = nz
        }
        s.lastPinchDist = cd; return
      }
      // Only prevent scroll when actively dragging the YOU node
      if (!s.mouseJoint) return
      e.preventDefault()
      const t = e.touches[0]
      if (!t) return
      const rect = canvas.getBoundingClientRect()
      s.mouseJoint.setTarget(toWorld(t.clientX - rect.left, t.clientY - rect.top))
    }

    const onTouchEnd = () => {
      const s = stateRef.current
      if (s.world && s.mouseJoint) s.world.destroyJoint(s.mouseJoint)
      s.mouseJoint = null; s.draggedNode = null; s.lastPinchDist = null
    }

    canvas.addEventListener("touchstart", onTouchStart, { passive: false })
    canvas.addEventListener("touchmove", onTouchMove, { passive: false })
    canvas.addEventListener("touchend", onTouchEnd)

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart)
      canvas.removeEventListener("touchmove", onTouchMove)
      canvas.removeEventListener("touchend", onTouchEnd)
    }
  }, [toWorld])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: "pan-y" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    />
  )
})

export default NetworkCanvas
