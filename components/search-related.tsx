'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import {
  StreamableValue,
  useActions,
  useStreamableValue,
  useUIState
} from 'ai/rsc'
import { AI } from '@/app/actions'
import { UserMessage } from './user-message'
import { PartialRelated } from '@/lib/schema/related'
import { Section } from './section'
import { Skeleton } from './ui/skeleton'
import toast from 'react-hot-toast'
import { useActiveAccount } from 'thirdweb/react'

export interface SearchRelatedProps {
  relatedQueries: StreamableValue<PartialRelated>
}

export const SearchRelated: React.FC<SearchRelatedProps> = ({
  relatedQueries
}) => {
  const { submit } = useActions()
  const account = useActiveAccount()

  const [, setMessages] = useUIState<typeof AI>()
  const [data, error, pending] = useStreamableValue(relatedQueries)
  const [related, setRelated] = useState<PartialRelated>()

  useEffect(() => {
    if (!data) return
    setRelated(data)
  }, [data])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)

    // // Get the submitter of the form
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLInputElement
    let query = ''
    if (submitter) {
      formData.append(submitter.name, submitter.value)
      query = submitter.value
    }

    const userMessage = {
      id: Date.now(),
      component: <UserMessage message={query} />
    }

    const responseMessage = await submit(formData)
    setMessages(currentMessages => [
      ...currentMessages,
      userMessage,
      responseMessage
    ])
  }
  const sourceClick = (linkText: any) => {
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
  return related ? (
    <Section title="Related" separator={true}>
      <form onSubmit={handleSubmit} className="flex flex-wrap">
        {related?.items
          ?.filter(item => item?.query !== '')
          .map((item, index) => (
            <div className="flex items-start w-full" key={index}>
              <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-accent-foreground/50" />
              <Button
                onClick={() => sourceClick(item?.query)}
                variant="link"
                className="flex-1 justify-start px-0 py-1 h-fit font-semibold text-accent-foreground/50 whitespace-normal text-left"
                type="submit"
                name={'related_query'}
                value={item?.query}
              >
                {item?.query}
              </Button>
            </div>
          ))}
      </form>
    </Section>
  ) : error ? null : (
    <Section title="Related" separator={true}>
      <Skeleton className="w-full h-6" />
    </Section>
  )
}

export default SearchRelated
