'use client'

import { SearchResults } from './search-results'
import { SearchSkeleton } from './search-skeleton'
import { SearchResultsImageSection } from './search-results-image'
import { Section } from './section'
import { ToolBadge } from './tool-badge'
import type { SearchResults as TypeSearchResults } from '@/lib/types'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { useTheme } from 'next-themes'

export type SearchSectionProps = {
  result?: StreamableValue<string>
  includeDomains?: string[]
}

export function SearchSection({ result, includeDomains }: SearchSectionProps) {
  const { theme } = useTheme()

  const [data, error, pending] = useStreamableValue(result)
  const searchResults: TypeSearchResults = data ? JSON.parse(data) : undefined
  const includeDomainsString = includeDomains
    ? ` [${includeDomains.join(', ')}]`
    : ''
    // const logoSrc = theme === 'light' ? '/images/Search.svg' : '/images/Search-dark.svg'

  return (
    <div>
      {/* {<p>{JSON.stringify({ pending, data })}</p>} */}
      {!pending && data ? (
        <>
          <Section size="sm" className="pt-2 pb-0">
            <ToolBadge tool="search">{`${searchResults.query}${includeDomainsString}`}</ToolBadge>
          </Section>
          {searchResults.images && searchResults.images.length > 0 && (
            <Section title="Images">
              <SearchResultsImageSection
                images={searchResults.images}
                query={searchResults.query}
              />
            </Section>
          )}
          <Section title="Sources">
            <SearchResults results={searchResults.results} />
          </Section>
        </>
      ) : (
        <Section className="pt-2 pb-0">
              <div
        className="mb-[20px]"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <img
          src={
            theme === 'light' ? '/images/Search.svg' : '/images/Search-dark.svg'
          }
          // src={
          //   theme?.theme === 'light'
          //     ? '/images/presale.svg'
          //     : '/images/presale-dark.svg'
          // }
          width={'200px'}
          height={'200px'}
        />
      </div>
          {/* <SearchSkeleton /> */}
        </Section>
      )}
    </div>
  )
}
