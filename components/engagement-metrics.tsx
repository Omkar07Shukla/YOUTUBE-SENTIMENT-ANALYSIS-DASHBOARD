"use client"

import { useState, useEffect } from "react"
import type { YoutubeData } from "@/lib/types"
import { MessageSquare, Users } from "lucide-react"

type TimePeriod = "7days" | "15days" | "30days"

export function EngagementMetrics({ data, timePeriod }: { data: YoutubeData; timePeriod: TimePeriod }) {
  const [metrics, setMetrics] = useState({
    comments: 0,
    users: 0,
    commentGrowth: 0,
    userGrowth: 0,
  })

  useEffect(() => {
    // Update metrics based on the selected time period
    switch (timePeriod) {
      case "7days":
        setMetrics({
          comments: 1740,
          users: 1436,
          commentGrowth: 44.6,
          userGrowth: 37.8,
        })
        break
      case "15days":
        setMetrics({
          comments: 3250,
          users: 2780,
          commentGrowth: 32.1,
          userGrowth: 28.5,
        })
        break
      case "30days":
        setMetrics({
          comments: 5840,
          users: 4320,
          commentGrowth: 21.3,
          userGrowth: 18.9,
        })
        break
      default:
        setMetrics({
          comments: 1740,
          users: 1436,
          commentGrowth: 44.6,
          userGrowth: 37.8,
        })
    }
  }, [data, timePeriod])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 p-3 bg-cyan-600 rounded-md">
        <MessageSquare className="h-8 w-8 text-white" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{metrics.comments}</span>
          <span className="text-sm">comments</span>
        </div>
        <div className="ml-auto flex items-center gap-1 text-white">
          <span className="text-lg font-bold">{metrics.commentGrowth.toFixed(1)}%</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-md">
        <Users className="h-8 w-8 text-white" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{metrics.users}</span>
          <span className="text-sm">users</span>
        </div>
        <div className="ml-auto flex items-center gap-1 text-white">
          <span className="text-lg font-bold">{metrics.userGrowth.toFixed(1)}%</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
