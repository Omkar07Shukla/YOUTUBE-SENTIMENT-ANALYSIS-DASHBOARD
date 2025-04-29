"use client"

import { useState, useEffect } from "react"
import type { YoutubeData } from "@/lib/types"
import { ExternalLink, ThumbsUp, ThumbsDown, Minus } from "lucide-react"

type TimePeriod = "7days" | "15days" | "30days"

export function VideoList({ data, timePeriod }: { data: YoutubeData; timePeriod: TimePeriod }) {
  const [videos, setVideos] = useState<any[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if (data && data.length > 0) {
      // Filter videos based on time period (this is simulated)
      // In a real app, you would filter based on actual dates
      const filteredData = [...data]

      // Simulate different data for different time periods
      // by adjusting the sentiment distribution
      const videosWithSentiment = filteredData.map((video, index) => {
        // Generate sentiment based on time period
        let sentimentScore

        if (timePeriod === "7days") {
          // More positive sentiment in recent 7 days
          sentimentScore = 0.3 + Math.random() * 0.7
        } else if (timePeriod === "15days") {
          // More mixed sentiment in 15 days
          sentimentScore = 0.2 + Math.random() * 0.8
        } else {
          // More varied sentiment in 30 days
          sentimentScore = Math.random()
        }

        let sentiment = "neutral"
        let sentimentColor = "bg-yellow-500"

        if (sentimentScore > 0.6) {
          sentiment = "positive"
          sentimentColor = "bg-green-500"
        } else if (sentimentScore < 0.4) {
          sentiment = "negative"
          sentimentColor = "bg-red-500"
        }

        return {
          ...video,
          sentiment,
          sentimentColor,
        }
      })

      setVideos(videosWithSentiment)
    }
  }, [data, timePeriod])

  const displayedVideos = showAll ? videos : videos.slice(0, 10)

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4">
        {displayedVideos.map((video, index) => (
          <div
            key={index}
            className="bg-zinc-800 p-4 rounded-md border border-zinc-700 hover:border-red-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${video.sentimentColor}`}></div>
              <h3 className="text-lg font-medium flex-1 truncate">{video.title}</h3>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 flex items-center gap-1"
              >
                <span className="text-sm">View</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {video.sentiment === "positive" ? (
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                ) : video.sentiment === "negative" ? (
                  <ThumbsDown className="h-4 w-4 text-red-500" />
                ) : (
                  <Minus className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-sm capitalize">{video.sentiment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="self-center mt-4 px-4 py-2 bg-red-800 hover:bg-red-700 rounded-md"
        >
          {showAll ? "Show Less" : "Show All Videos"}
        </button>
      )}
    </div>
  )
}
