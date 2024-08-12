import { tool } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import Exa from 'exa-js'
import { searchSchema } from '@/lib/schema/search'
import { SearchSection } from '@/components/search-section'
import { ToolProps } from '.'
import Result from 'postcss/lib/result'

export const searchTool = ({ uiStream, fullResponse }: ToolProps) =>
  tool({
    description: 'Search the web for information',
    parameters: searchSchema,
    execute: async ({
      query,
      max_results,
      search_depth,
      include_domains,
      exclude_domains
    }) => {
      let hasError = false
      // Append the search section
      const streamResults = createStreamableValue<string>()
      uiStream.update(
        <SearchSection
          result={streamResults.value}
          includeDomains={include_domains}
        />
      )

      // Tavily API requires a minimum of 5 characters in the query
      const filledQuery =
        query.length < 5 ? query + ' '.repeat(5 - query.length) : query
      let searchResult
      const searchAPI: 'tavily' | 'exa' = 'tavily'
      try {
        searchResult =
          searchAPI === 'tavily'
            ? await tavilySearch(filledQuery)
            : await exaSearch(query)
      } catch (error) {
        console.error('Search API error:', error)
        hasError = true
      }

      if (hasError) {
        fullResponse = `An error occurred while searching for "${query}.`
        uiStream.update(null)
        streamResults.done()
        return searchResult
      }

      streamResults.done(JSON.stringify(searchResult))

      return searchResult
    }
  })

async function tavilySearch(query: string): Promise<any> {
  let res = await fetch('https://ai.joblab.ai/text-only-search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: query
    })
  })
  const data1 = await res.json()

  let ress = []
  let thumbnail = []
  for (let index = 0; index < data1?.searchResult?.results.length; index++) {
    const element = data1?.searchResult?.results[index]
    let obj11 = {
      title: element?.title,
      url: element?.url,
      content: element?.content,
      score: element?.score,
      raw_content: null
    }
    if (element?.thumbnail) {
      thumbnail.push(element?.thumbnail)
    }
    if (element?.thumbnail_src) {
      thumbnail.push(element?.thumbnail_src)
    }
    if (element?.img_src) {
      thumbnail.push(element?.img_src)
    }

    ress.push(obj11)
  }

  let obj = {
    ...data1?.searchResult,
    answers: data1?.searchResult?.answer,
    images: thumbnail,
    follow_up_questions: null,
    results: ress
  }

  return obj
}

async function exaSearch(
  query: string,
  maxResults: number = 10,
  includeDomains: string[] = [],
  excludeDomains: string[] = []
): Promise<any> {
  const apiKey = process.env.EXA_API_KEY
  const exa = new Exa(apiKey)
  return exa.searchAndContents(query, {
    highlights: true,
    numResults: maxResults,
    includeDomains,
    excludeDomains
  })
}
