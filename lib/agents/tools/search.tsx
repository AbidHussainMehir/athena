// import { tool } from 'ai'
// import { createStreamableValue } from 'ai/rsc'
// import Exa from 'exa-js'
// import { searchSchema } from '@/lib/schema/search'
// import { SearchSection } from '@/components/search-section'
// import { ToolProps } from '.'
// import Result from 'postcss/lib/result'

// export const searchTool = ({ uiStream, fullResponse }: ToolProps) =>
//   tool({
//     description: 'Search the web for information',
//     parameters: searchSchema,
//     execute: async ({
//       query,
//       max_results,
//       search_depth,
//       include_domains,
//       exclude_domains
//     }) => {
//       let hasError = false
//       // Append the search section
//       const streamResults = createStreamableValue<string>()
//       uiStream.update(
//         <SearchSection
//           result={streamResults.value}
//           includeDomains={include_domains}
//         />
//       )

//       // Tavily API requires a minimum of 5 characters in the query
//       const filledQuery =
//         query.length < 5 ? query + ' '.repeat(5 - query.length) : query
//       let searchResult
//       const searchAPI: 'tavily' | 'exa' = 'tavily'
//       try {
//         searchResult =
//           searchAPI === 'tavily'
//             ? await tavilySearch(filledQuery)
//             : await exaSearch(query)
//         console.error('searchResult API error:', searchResult)
//         console.error('searchAPI error:', searchAPI)
//       } catch (error: any) {
//         console.error('Search API error:', error.message)
//         hasError = true
//       }

//       if (hasError) {
//         fullResponse = `An error occurred while searching for "${query}.`
//         uiStream.update(null)
//         streamResults.done()
//         return searchResult
//       }

//       streamResults.done(JSON.stringify(searchResult))

//       return searchResult
//     }
//   })

// async function tavilySearch(query: string): Promise<any> {
//   let res = await fetch('https://ai.joblab.ai/text-only-search/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       text: query
//     })
//   })
//   const data1 = await res.json()

//   let ress = []
//   let thumbnail = []
//   for (let index = 0; index < data1?.searchResult?.results.length; index++) {
//     const element = data1?.searchResult?.results[index]
//     let obj11 = {
//       title: element?.title,
//       url: element?.url,
//       content: element?.content,
//       score: element?.score,
//       raw_content: null
//     }
//     if (element?.thumbnail) {
//       thumbnail.push(element?.thumbnail)
//     }
//     if (element?.thumbnail_src) {
//       thumbnail.push(element?.thumbnail_src)
//     }
//     if (element?.img_src) {
//       thumbnail.push(element?.img_src)
//     }

//     ress.push(obj11)
//   }

//   let obj = {
//     ...data1?.searchResult,
//     answers: data1?.searchResult?.answer,
//     images: thumbnail,
//     follow_up_questions: null,
//     results: ress
//   }

//   return obj
// }

// async function exaSearch(
//   query: string,
//   maxResults: number = 10,
//   includeDomains: string[] = [],
//   excludeDomains: string[] = []
// ): Promise<any> {
//   const apiKey = process.env.EXA_API_KEY
//   const exa = new Exa(apiKey)
//   return exa.searchAndContents(query, {
//     highlights: true,
//     numResults: maxResults,
//     includeDomains,
//     excludeDomains
//   })
// }

import { tool } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import Exa from 'exa-js'
import { searchSchema } from '@/lib/schema/search'
import { SearchSection } from '@/components/search-section'
import { ToolProps } from '.'
import { sanitizeUrl } from '@/lib/utils'
import {
  SearchResultImage,
  SearchResults,
  SearchResultItem,
  SearXNGResponse,
  SearXNGResult
} from '@/lib/types'

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
      uiStream.append(
        <SearchSection
          result={streamResults.value}
          includeDomains={include_domains}
        />
      )

      // Tavily API requires a minimum of 5 characters in the query
      const filledQuery =
        query.length < 5 ? query + ' '.repeat(5 - query.length) : query
      let searchResult: SearchResults
      const searchAPI = 'searxng' as any
      // (process.env.SEARCH_API as 'tavily' | 'exa' | 'searxng') || 'tavily'

      const effectiveSearchDepth =
        searchAPI === 'searxng' &&
          process.env.SEARXNG_DEFAULT_DEPTH === 'advanced'
          ? 'advanced'
          : search_depth || 'basic'

      console.log(
        `Using search API: ${searchAPI}, Search Depth: ${effectiveSearchDepth}`
      )

      try {
        searchResult = await searxngSearch(
          filledQuery,
          max_results,
          effectiveSearchDepth === 'advanced' ? 'advanced' : 'basic',
          include_domains,
          exclude_domains
        )
      } catch (error) {
        console.error('Search API error:', error)
        hasError = true
        searchResult = {
          results: [],
          query: filledQuery,
          images: [],
          number_of_results: 0
        }
      }

      if (hasError) {
        fullResponse = `An error occurred while searching for "${filledQuery}".`
        uiStream.update(null)
        streamResults.done()
        return searchResult
      }

      streamResults.done(JSON.stringify(searchResult))
      return searchResult
    }
  })




async function searxngSearch(
  query: string,
  maxResults: number = 10,
  searchDepth: string,
  includeDomains: string[] = [],
  excludeDomains: string[] = []
): Promise<SearchResults> {
  const apiUrl = process.env.SEARXNG_API_URL
  if (!apiUrl) {
    throw new Error('SEARXNG_API_URL is not set in the environment variables')
  }

  try {
    console.log('here 2')
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/search`)
    url.searchParams.append('q', query)
    url.searchParams.append('format', 'json')
    url.searchParams.append('categories', 'general,images')

    // Apply search depth settings
    // if (searchDepth === 'advanced') {
    //   url.searchParams.append('time_range', '')
    //   url.searchParams.append('safesearch', '0')
    //   url.searchParams.append('engines', 'google,bing,duckduckgo,wikipedia')
    // } else {
    //   url.searchParams.append('time_range', 'year')
    //   url.searchParams.append('safesearch', '1')
    //   url.searchParams.append('engines', 'google,bing')
    // }

    // Fetch results from SearXNG
    console.log(url.toString())
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`SearXNG API error (${response.status}):`, errorText)
      throw new Error(
        `SearXNG API error: ${response.status} ${response.statusText} - ${errorText}`
      )
    }

    const data: SearXNGResponse = await response.json()
    console.log({ data })
    // Separate general results and image results, and limit to maxResults
    const generalResults = data.results.filter(result => !result.img_src)
    // .slice(0, maxResults)
    const imageResults = data.results.filter(result => result.img_src)
    // .slice(0, maxResults)
    console.log({ generalResults })

    // Format the results to match the expected SearchResults structure
    return {
      results: generalResults.map(
        (result: SearXNGResult): SearchResultItem => ({
          title: result.title,
          url: result.url,
          content: result.content
        })
      ),
      query: data.query,
      images: imageResults
        .map(result => {
          const imgSrc = result.img_src || ''
          return imgSrc.startsWith('http') ? imgSrc : `${apiUrl}${imgSrc}`
        })
        .filter(Boolean),
      number_of_results: data.number_of_results
    }
  } catch (error) {
    console.error('SearXNG API error:', error)
    throw error
  }
}
