import { notFound, redirect } from 'next/navigation'
import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { AI } from '@/app/actions'
import { useActiveAccount } from 'thirdweb/react'

export const maxDuration = 60

export interface SearchPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SearchPageProps) {
  const chat = await getChat(params.id, 'anonymous')
  return {
    title: 'Search'
  }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const userId = 'anonymous'

  return (
    <AI
      initialAIState={{
        chatId: '',
        messages: '' as any,
        user: ''
      }}
    >
      <Chat id={params.id} />
    </AI>
  )
}
