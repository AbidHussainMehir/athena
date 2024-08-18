import { Chat } from '@/components/chat'
import { generateId } from 'ai'
import { AI } from './actions'
import { useActiveAccount } from 'thirdweb/react'
import Head from 'next/head'

export const maxDuration = 60

export default function Page() {
  const id = generateId()
  const account: any = { address: '0xb5483f5866A17635D8256d589f0905a54f8eA414' }
  return (
    <>
      <Head>
        <title>TheAthena.ai</title>
        <meta
          name="description"
          content="Athena SearchGPT: Learn to Earn Search Platform."
        />
        <meta property="og:title" content="TheAthena.ai" />
        <meta
          property="og:description"
          content="Athena SearchGPT: Learn to Earn Search Platform."
        />
        <meta property="og:image" content="https://www.theathena.ai/logo.svg" />
        <meta property="og:url" content="https://www.theathena.ai" />
        <meta property="og:type" content="website" />
      </Head>
      <AI initialAIState={{ chatId: id, messages: [], user: account?.address }}>
        <Chat id={id} />
      </AI>
    </>
  )
}
