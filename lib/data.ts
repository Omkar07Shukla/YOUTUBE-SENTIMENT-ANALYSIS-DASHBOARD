import type { YoutubeData } from "./types"

export async function fetchYoutubeData(): Promise<YoutubeData> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/youtube_shorts-Q8SAu2fODx8pjRFcuJ66X7wXQZrQGM.csv",
    )

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    const csvText = await response.text()
    const parsedData = parseCSV(csvText)
    return parsedData
  } catch (error) {
    console.error("Error fetching YouTube data:", error)
    return []
  }
}

function parseCSV(csvText: string): YoutubeData {
  const lines = csvText.split("\n")
  const headers = lines[0].split(",")

  const titleIndex = headers.findIndex((h) => h.trim().toLowerCase() === "title")
  const urlIndex = headers.findIndex((h) => h.trim().toLowerCase() === "url")

  if (titleIndex === -1 || urlIndex === -1) {
    throw new Error("CSV is missing required columns (title, url)")
  }

  const data: YoutubeData = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue

    const values = lines[i].split(",")

    if (values.length >= Math.max(titleIndex, urlIndex) + 1) {
      data.push({
        title: values[titleIndex].trim().replace(/^"|"$/g, ""),
        url: values[urlIndex].trim().replace(/^"|"$/g, ""),
      })
    }
  }

  return data
}
