"use client"

import { useEffect, useState } from "react"

export default function SystemInfo() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [city, setCity] = useState("Detecting...")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      // ⏰ Time
      setTime(now.toLocaleTimeString())

      // 📅 Date (March 17, 2026)
      setDate(
        now.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    // 📍 Get location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await res.json()

          setCity(
            data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state || // fallback
              "Unknown"
          )
        } catch {
          setCity("Unknown")
        }
      },
      () => {
        setCity("Location blocked")
      }
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-4 text-sm md:text-base">
      <span>{time}</span>
      <span>{date}</span>
      <span>{city}</span>
    </div>
  )
}