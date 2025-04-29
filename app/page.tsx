"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { SentimentGauge } from "@/components/sentiment-gauge"
import { SentimentBreakdown } from "@/components/sentiment-breakdown"
import { EngagementMetrics } from "@/components/engagement-metrics"
import { SentimentTimeline } from "@/components/sentiment-timeline"
import { VideoList } from "@/components/video-list"
import { TimePeriodSelector } from "@/components/time-period-selector"
import { fetchYoutubeData } from "@/lib/data"
import type { YoutubeData } from "@/lib/types"

type TimePeriod = "7days" | "15days" | "30days"

export default function Dashboard() {
  const [data, setData] = useState<YoutubeData>([])
  const [loading, setLoading] = useState(true)
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("7days")

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const fetchedData = await fetchYoutubeData()
        setData(fetchedData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handlePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardHeader />
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">YouTube Mood Analysis</h1>
          <TimePeriodSelector onPeriodChange={handlePeriodChange} activePeriod={timePeriod} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 rounded-lg border border-red-800">
            <h2 className="text-xl font-bold mb-4">OVERALL SENTIMENT LEVEL</h2>
            <SentimentGauge data={data} timePeriod={timePeriod} />
          </div>

          <div className="bg-zinc-900 p-4 rounded-lg border border-red-800">
            <h2 className="text-xl font-bold mb-4">COMMENTS SENTIMENT</h2>
            <SentimentBreakdown data={data} timePeriod={timePeriod} />
          </div>

          <div className="bg-zinc-900 p-4 rounded-lg border border-red-800">
            <h2 className="text-xl font-bold mb-4">ENGAGEMENT</h2>
            <EngagementMetrics data={data} timePeriod={timePeriod} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 rounded-lg border border-red-800">
            <h2 className="text-xl font-bold mb-4">SENTIMENT TIMELINE</h2>
            <SentimentTimeline data={data} timePeriod={timePeriod} />
          </div>
        </div>

        <div className="bg-zinc-900 p-4 rounded-lg border border-red-800">
          <h2 className="text-xl font-bold mb-4">YOUTUBE SHORTS</h2>
          <VideoList data={data} timePeriod={timePeriod} />
        </div>
      </main>
    </div>
  )
}
