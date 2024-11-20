export type SearchResults = {
  images: string[]
  results: SearchResultItem[]
  query: string
  number_of_results?: number
}

export type SearchResultImage =
  | string
  | {
      url: string
      description: string
      number_of_results?: number
    }
export type ExaSearchResults = {
  results: ExaSearchResultItem[]
}

export type SerperSearchResults = {
  searchParameters: {
    q: string
    type: string
    engine: string
  }
  videos: SerperSearchResultItem[]
}

export type SearchResultItem = {
  title: string
  url: string
  content: string
}

export type ExaSearchResultItem = {
  score: number
  title: string
  id: string
  url: string
  publishedDate: Date
  author: string
}

export type SerperSearchResultItem = {
  title: string
  link: string
  snippet: string
  imageUrl: string
  duration: string
  source: string
  channel: string
  date: string
  position: number
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: AIMessage[]
  sharePath?: string
}

export type AIMessage = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
  type?:
    | 'answer'
    | 'related'
    | 'skip'
    | 'inquiry'
    | 'input'
    | 'input_related'
    | 'tool'
    | 'followup'
    | 'end'
}
export interface SearXNGResult {
  title: string
  url: string
  content: string
  img_src?: string
  publishedDate?: string
  score?: number
}

export interface SearXNGResponse {
  query: string
  number_of_results: number
  results: SearXNGResult[]
}

export type SearXNGImageResult = string

export type SearXNGSearchResults = {
  images: SearXNGImageResult[]
  results: SearchResultItem[]
  number_of_results?: number
  query: string
}
