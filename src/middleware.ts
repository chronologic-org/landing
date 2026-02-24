import { NextResponse, type NextRequest } from "next/server"
import { jwtVerify } from "jose"

const COOKIE_NAME = "sckry_session_v2"
const APP_URL = "https://app.sckry.com"

function getSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("JWT_SECRET environment variable is required")
  return new TextEncoder().encode(secret)
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) return NextResponse.next()

  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (!payload.userId) return NextResponse.next()

    // Valid session — redirect to the app
    return NextResponse.redirect(APP_URL)
  } catch {
    // Expired or invalid token — let the request through
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/"],
}
