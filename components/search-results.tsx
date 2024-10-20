'use client'

import { useState } from 'react'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CardContent, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SearchResultItem } from '@/lib/types'
import { useTheme } from 'next-themes'
import toast from 'react-hot-toast'
import { useActiveAccount } from 'thirdweb/react'

export interface SearchResultsProps {
  results: SearchResultItem[]
}

export function SearchResults({ results }: SearchResultsProps) {
  // State to manage whether to display the results
  const [showAllResults, setShowAllResults] = useState(false)
  const account = useActiveAccount()

  const handleViewMore = () => {
    setShowAllResults(true)
  }

  const displayedResults = showAllResults ? results : results.slice(0, 3)
  const additionalResultsCount = results.length > 3 ? results.length - 3 : 0
  const displayUrlName = (url: string) => {
    const hostname = new URL(url).hostname
    const parts = hostname.split('.')
    return parts.length > 2 ? parts.slice(1, -1).join('.') : parts[0]
  }
  const sourceClick = (linkText: any) => {
    // window._mtm.push({
    //   event: 'source-click',
    //   'event-category': 'menu-clicks',
    //   'event-value': linkText,
    //   'event-action': `${document.title} - ${window.location.href}`
    // })
    window._paq.push(['trackEvent', 'source-click', linkText])
    if (account?.address) {
      toast('🤑Reward Earned', {
        style: {
          background: 'green',
          color: '#fff'
        }
      })
    } else {
      toast('🙁Reward Missed - Connect Wallet', {
        style: {
          background: 'red',
          color: '#fff'
        }
      })
    }
  }
  // _paq.push(['trackEvent', 'CATEGORY', 'ACTION','EVENT_NAME(optional)','EVENT_VALUE(optional)']);
  // _paq.push(['trackEvent', 'FormSubmission', 'page url','EVENT_NAME(optional)','EVENT_VALUE(optional)']);
  const { theme } = useTheme()

  return (
    <div className="flex flex-wrap">
      {displayedResults.map((result, index) => (
        <div className="w-1/2 md:w-1/4 p-1" key={index}>
          <Link
            href={result.url}
            onClick={() => sourceClick(result.url)}
            passHref
            target="_blank"
          >
            <Card className="flex-1">
              <CardContent className="p-2">
                <p className="text-xs line-clamp-2">
                  {result.title || result.content}
                </p>
                <div className="mt-2 flex items-center space-x-1">
                  <Avatar className="h-4 w-4">
                    <AvatarImage
                      src={`https://www.google.com/s2/favicons?domain=${
                        new URL(result.url).hostname
                      }`}
                      alt={new URL(result.url).hostname}
                    />
                    <AvatarFallback>
                      {new URL(result.url).hostname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs opacity-60 truncate">
                    {`${displayUrlName(result.url)} - ${index + 1}`}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
      {!showAllResults && additionalResultsCount > 0 && (
        <div className="w-1/2 md:w-1/4 p-1">
          <Card className="flex-1 flex h-full items-center justify-center">
            <CardContent className="p-2">
              <Button
                variant="link"
                style={{
                  color: theme === 'light' ? '#000' : 'rgb(202, 241, 222)'
                }} // Apply the color conditionally
                onClick={handleViewMore}
              >
                View {additionalResultsCount} more
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
