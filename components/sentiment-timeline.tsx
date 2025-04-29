"use client"

import { useState, useEffect } from "react"
import type { YoutubeData } from "@/lib/types"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts"

type TimePeriod = "7days" | "15days" | "30days"

export function SentimentTimeline({ data, timePeriod }: { data: YoutubeData; timePeriod: TimePeriod }) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Generate sample data for the timeline based on the selected time period
    let dates: string[] = []

    switch (timePeriod) {
      case "7days":
        dates = ["13-Feb", "14-Feb", "15-Feb", "16-Feb", "17-Feb", "18-Feb", "19-Feb"]
        break
      case "15days":
        dates = ["5-Feb", "7-Feb", "9-Feb", "11-Feb", "13-Feb", "15-Feb", "17-Feb", "19-Feb"]
        break
      case "30days":
        dates = ["21-Jan", "25-Jan", "29-Jan", "2-Feb", "6-Feb", "10-Feb", "14-Feb", "19-Feb"]
        break
      default:
        dates = ["13-Feb", "14-Feb", "15-Feb", "16-Feb", "17-Feb", "18-Feb", "19-Feb"]
    }

    const sampleData = dates.map((date, index) => {
      // Create different patterns based on time period
      let positive, neutral, negative, score

      if (timePeriod === "7days") {
        // For 7 days, show increasing positive trend
        const progress = index / (dates.length - 1)
        positive = Math.floor(40 + progress * 30)
        neutral = Math.floor(20 - progress * 10)
        negative = Math.floor(15 - progress * 5)
      } else if (timePeriod === "15days") {
        // For 15 days, show more fluctuation
        positive = Math.floor(45 + Math.sin(index) * 15)
        neutral = Math.floor(15 + Math.cos(index) * 10)
        negative = Math.floor(10 + Math.sin(index + 2) * 5)
      } else {
        // For 30 days, show overall improvement with some dips
        const progress = index / (dates.length - 1)
        const fluctuation = Math.sin(index * 0.8) * 10
        positive = Math.floor(35 + progress * 25 + fluctuation)
        neutral = Math.floor(25 - progress * 10)
        negative = Math.floor(20 - progress * 10)
      }

      // Ensure values are within reasonable ranges
      positive = Math.max(30, Math.min(75, positive))
      neutral = Math.max(5, Math.min(30, neutral))
      negative = Math.max(5, Math.min(25, negative))

      // Calculate score based on sentiment distribution
      score = (positive * 5 + neutral * 3 + negative) / 100

      return {
        date,
        positive,
        neutral,
        negative,
        score,
      }
    })

    setChartData(sampleData)
  }, [data, timePeriod])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis yAxisId="left" orientation="left" stroke="#fff" />
          <YAxis yAxisId="right" orientation="right" domain={[0, 5]} stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#7f1d1d" }} />
          <Legend />
          <Bar yAxisId="left" dataKey="positive" stackId="a" fill="#22c55e" name="POSITIVE" />
          <Bar yAxisId="left" dataKey="neutral" stackId="a" fill="#eab308" name="NEUTRAL" />
          <Bar yAxisId="left" dataKey="negative" stackId="a" fill="#ef4444" name="NEGATIVE" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            name="SENTIMENT SCORE"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
