import { notFound } from 'next/navigation'
import { Chat } from '@/components/chat'
import { AI } from '@/app/actions'

export interface SharePageProps {
  params: {
    id: string
  }
}

export default async function SharePage({ params }: SharePageProps) {
  return (
    <AI
      initialAIState={{
        chatId: '',
        messages: '' as any,
        isSharePage: true,
        user: ''
      }}
    >
      <Chat id={params.id} />
    </AI>
  )
}
