import { Chat } from '@/components/chat'
import { generateId } from 'ai'
import { AI } from './actions'
import { useActiveAccount } from 'thirdweb/react'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { AppStateProvider } from '@/lib/utils/app-state'

export const maxDuration = 60

export default function Page() {
  const id = generateId()
  const account: any = { address: '0xb5483f5866A17635D8256d589f0905a54f8eA414' }
  return (
    <>
      <AppStateProvider>
        <Head>
          <title>TheAthena.ai</title>
          <meta
            name="description"
            content="Athena SearchGPT: Learn to Earn Search Platform."
          />
          <meta
            name="keywords"
            content="TheAthena.ai, searchGPT, Learn and Earn, decentralized search engine"
          />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="TheAthena.ai" />
          <meta
            property="og:description"
            content="Athena SearchGPT: Learn to Earn Search Platform."
          />
          <meta property="og:image" content="https://theathena.ai/logo.svg" />
          <meta property="og:url" content="https://theathena.ai" />
          <meta property="og:type" content="website" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="TheAthena.ai" />
          <meta
            name="twitter:description"
            content="Athena SearchGPT: Learn to Earn Search Platform."
          />
          <meta name="twitter:image" content="https://theathena.ai/logo.svg" />

          {/* Canonical Tag */}
          <link rel="canonical" href="https://theathena.ai" />

          {/* Icons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          ></link>
        </Head>

        <AI
          initialAIState={{ chatId: id, messages: [], user: account?.address }}
        >
          <Chat id={id} />
          <Toaster position="top-right" />
        </AI>
      </AppStateProvider>
    </>
  )
}
