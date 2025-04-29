"use client"

import { useState, useEffect } from "react"
import type { YoutubeData } from "@/lib/types"

type TimePeriod = "7days" | "15days" | "30days"

export function SentimentGauge({ data, timePeriod }: { data: YoutubeData; timePeriod: TimePeriod }) {
  const [score, setScore] = useState(0)
  const [sentiment, setSentiment] = useState("")

  useEffect(() => {
    // Calculate average sentiment score based on the selected time period
    let sentimentScore = 0

    switch (timePeriod) {
      case "7days":
        sentimentScore = 3.71 // Example score for 7 days
        break
      case "15days":
        sentimentScore = 3.45 // Example score for 15 days
        break
      case "30days":
        sentimentScore = 3.92 // Example score for 30 days
        break
      default:
        sentimentScore = 3.71
    }

    setScore(sentimentScore)

    // Determine sentiment label
    if (sentimentScore >= 3.5) {
      setSentiment("Positive")
    } else if (sentimentScore >= 2.5) {
      setSentiment("Neutral")
    } else {
      setSentiment("Negative")
    }
  }, [data, timePeriod])

  // Calculate rotation for gauge needle (0 to 180 degrees)
  const rotation = (score / 5) * 180

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24 mb-4">
        {/* Gauge background */}
        <div className="absolute w-full h-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-red-600 via-yellow-400 to-green-500 rounded-t-full"></div>
        </div>

        {/* Gauge markers */}
        <div className="absolute w-full h-full flex justify-between px-4 pt-2">
          <span className="text-white font-bold">1</span>
          <span className="text-white font-bold">5</span>
        </div>

        {/* Gauge needle */}
        <div
          className="absolute top-0 left-1/2 w-1 h-20 bg-white origin-bottom transform -translate-x-1/2"
          style={{ transform: `translateX(-50%) rotate(${rotation - 90}deg)` }}
        >
          <div className="w-3 h-3 rounded-full bg-white -mt-1 -ml-1"></div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold">{score.toFixed(2)}</span>
        <span className="text-lg">out of 5</span>
      </div>

      <div
        className={`text-xl mt-2 ${
          sentiment === "Positive" ? "text-green-500" : sentiment === "Negative" ? "text-red-500" : "text-yellow-400"
        }`}
      >
        {sentiment}
      </div>
    </div>
  )
}
