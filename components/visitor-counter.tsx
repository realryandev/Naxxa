"use client"

import { useState, useEffect } from "react"
import { Users, Activity } from "lucide-react"

interface VisitorCounterProps {
  isOwner?: boolean
}

export default function VisitorCounter({ isOwner = false }: VisitorCounterProps) {
  const [visitorCount, setVisitorCount] = useState(0)
  const [todayVisitors, setTodayVisitors] = useState(0)
  const [liveVisitors, setLiveVisitors] = useState(0)

  useEffect(() => {
    // Get visitor count from localStorage
    const visitors = JSON.parse(localStorage.getItem("visitors") || "[]")
    setVisitorCount(visitors.length)

    // Get today's visitors
    const today = new Date().toDateString()
    const todayVisitorsList = JSON.parse(localStorage.getItem(`visitors_${today}`) || "[]")
    setTodayVisitors(todayVisitorsList.length)

    // Simulate live visitors (in a real app, this would use a real-time database)
    setLiveVisitors(Math.min(todayVisitorsList.length, Math.floor(Math.random() * 5) + 1))

    // Update live visitors count periodically to simulate activity
    const interval = setInterval(() => {
      setLiveVisitors(Math.min(todayVisitorsList.length, Math.floor(Math.random() * 5) + 1))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
        <Activity className="h-4 w-4 text-green-400 animate-pulse" />
        <span className="text-sm font-medium">{liveVisitors} live visitors</span>
      </div>

      {isOwner && (
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
          <Users className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium">
            {todayVisitors} today / {visitorCount} total
          </span>
        </div>
      )}
    </div>
  )
}
