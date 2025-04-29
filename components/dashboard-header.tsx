import { MessageSquare, BarChart3 } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="bg-zinc-900 border-b border-red-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-bold">YouTube Mood Analysis Dashboard</h1>
        </div>

        <div className="flex gap-4">
          <button className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Sentiment Report
          </button>
        </div>
      </div>
    </header>
  )
}
