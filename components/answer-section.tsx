'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Section } from './section'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { BotMessage } from './message'
import { useEffect, useState } from 'react'
import { LikeDisLike } from './like-dislike'
import { useTheme } from 'next-themes'

export type AnswerSectionProps = {
  result?: StreamableValue<string>
  hasHeader?: boolean
}

export function AnswerSection({
  result,
  hasHeader = true
}: AnswerSectionProps) {
  const theme: any = useTheme()
  const [data, error, pending] = useStreamableValue(result)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (!data) return
    setContent(data)
  }, [data])
// console.log('theme',theme)
  return (
    <div>
      {content.length > 0 ? (
        <>
        <Section title={hasHeader ? 'Answer' : undefined}>
          <BotMessage content={content} />
          <LikeDisLike/>
        </Section>
       
        </>
      ) : (
        <div
        className="mb-[20px]"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <img
       
          src={
            theme?.theme === 'light'
              ? '/images/Search.svg'
              : '/images/Search-dark.svg'
          }
          width={'200px'}
          height={'200px'}
        />
      </div>
        // <div className="flex flex-col gap-2 py-2">
          
        //   <Skeleton className="h-6 w-48" />
        //   <Skeleton className="w-full h-6" />
        // </div>
      )}
    
    </div>
  )
}
