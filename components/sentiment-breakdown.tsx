"use client"

import { useState, useEffect } from "react"
import type { YoutubeData } from "@/lib/types"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

type TimePeriod = "7days" | "15days" | "30days"

export function SentimentBreakdown({ data, timePeriod }: { data: YoutubeData; timePeriod: TimePeriod }) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Update chart data based on the selected time period
    let positive = 0
    let negative = 0
    let neutral = 0

    switch (timePeriod) {
      case "7days":
        positive = 65
        negative = 17
        neutral = 18
        break
      case "15days":
        positive = 58
        negative = 22
        neutral = 20
        break
      case "30days":
        positive = 70
        negative = 15
        neutral = 15
        break
      default:
        positive = 65
        negative = 17
        neutral = 18
    }

    setChartData([
      { name: "Positive", value: positive, color: "#22c55e" },
      { name: "Negative", value: negative, color: "#ef4444" },
      { name: "Neutral", value: neutral, color: "#eab308" },
    ])
  }, [data, timePeriod])

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} paddingAngle={2} dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "Percentage"]}
              contentStyle={{ backgroundColor: "#18181b", borderColor: "#7f1d1d" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2 mt-4 md:mt-0">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm">
              {item.value}% {item.name.toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
