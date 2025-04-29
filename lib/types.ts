export interface YoutubeVideo {
  title: string
  url: string
}

export type YoutubeData = YoutubeVideo[]

export type TimePeriod = "7days" | "15days" | "30days"
