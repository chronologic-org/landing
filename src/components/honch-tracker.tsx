"use client"

import { useEffect } from "react"
import honch from "@honch/sdk"

export function HonchTracker() {
    useEffect(() => {
        honch.init("phc_vfEHDxGCYnNwjAkgbB2YfWLKvWNJLKGQa2wHE7hHEyY", {
            api_host: "https://capture.honch.io",
            autocapture: true,
            capture_clicks: true,
            capture_forms: true,
            session_recording: true,
        })
    }, [])

    return null
}
