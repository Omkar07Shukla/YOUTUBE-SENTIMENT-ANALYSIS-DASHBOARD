"use client"
import { Calendar } from "lucide-react"

type TimePeriod = "7days" | "15days" | "30days"

interface TimePeriodSelectorProps {
  onPeriodChange: (period: TimePeriod) => void
  activePeriod: TimePeriod
}

export function TimePeriodSelector({ onPeriodChange, activePeriod }: TimePeriodSelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-lg border border-red-800">
      <Calendar className="h-5 w-5 text-red-500" />
      <div className="flex">
        <button
          onClick={() => onPeriodChange("7days")}
          className={`px-3 py-1 text-sm rounded-l-md transition-colors ${
            activePeriod === "7days" ? "bg-red-800 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          Past 7 days
        </button>
        <button
          onClick={() => onPeriodChange("15days")}
          className={`px-3 py-1 text-sm transition-colors ${
            activePeriod === "15days" ? "bg-red-800 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          Past 15 days
        </button>
        <button
          onClick={() => onPeriodChange("30days")}
          className={`px-3 py-1 text-sm rounded-r-md transition-colors ${
            activePeriod === "30days" ? "bg-red-800 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          Past 30 days
        </button>
      </div>
    </div>
  )
}
