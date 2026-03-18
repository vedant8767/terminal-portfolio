"use client"

import { useEffect, useState } from "react"

export default function SystemStats() {
  const [info, setInfo] = useState(null)
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const start = Date.now()

    // ⏱ uptime timer
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000))
    }, 1000)

    // 🌐 Fetch IP info
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setInfo(data)
      })
      .catch(() => setInfo({ error: true }))

    return () => clearInterval(interval)
  }, [])

  // ⏱ format uptime
  const formatUptime = (sec) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return `${h}h ${m}m ${s}s`
  }

  const connection = navigator.connection || {}

  return (
    <pre className="text-green-400 text-xs md:text-sm leading-tight my-2 whitespace-pre-wrap">
{`SYSTEM INFORMATION
------------------
Browser        : ${navigator.userAgent.match(/Chrome\/(\d+)/)?.[0] || "Unknown"}
Platform       : ${navigator.platform}
CPU Cores      : ${navigator.hardwareConcurrency}
Memory         : ${navigator.deviceMemory || "N/A"} GB
CPU Arch       : Unknown
Network        : ${connection.effectiveType || "N/A"} (${navigator.onLine ? "Online" : "Offline"})
Language       : ${navigator.language}
Timezone       : ${Intl.DateTimeFormat().resolvedOptions().timeZone}
Screen         : ${window.innerWidth}x${window.innerHeight}
Uptime         : ${formatUptime(uptime)}

IP INFORMATION
--------------
IP Address     : ${info?.ip || "Loading..."}
City           : ${info?.city || "Loading..."}
Region         : ${info?.region || "Loading..."}
Country        : ${info?.country_name || "Loading..."}
Postal Code    : ${info?.postal || "Loading..."}
Latitude/Long. : ${info?.latitude || "-"}, ${info?.longitude || "-"}
Currency       : ${info?.currency || "N/A"}
Time Zone (IP) : ${info?.timezone || "N/A"}
Org            : ${info?.org || "N/A"}
ASN            : ${info?.asn || "N/A"}
VPN/Proxy      : ${info?.proxy ? "Yes" : "No"}
`}
    </pre>
  )
}