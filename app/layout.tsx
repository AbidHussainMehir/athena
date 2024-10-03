import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AppStateProvider } from '@/lib/utils/app-state'
import { ThirdwebProvider } from 'thirdweb/react'
import Head from 'next/head'
import { useUIState } from 'ai/rsc'
import { AI } from '@/app/actions'

const title = 'Athena SearchGPT'
const description = 'Athena SearchGPT: Learn to Earn Search Platform.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.theathena.ai'),
  title,
  description,
  keywords: [
    'TheAthena.ai',
    'TheAthena',
    'searchGPT',
    'Athena SearchGPT',
    'Search Platform',
    'ai',
    'gpt',
    'rewards',
    'AI-powered search engine',
    'AI search engine',
    'Decentralized search engine',
    'Privacy-focused search engine',
    'AI-driven search engine',
    'GPT-powered search engine',
    'Learn and Earn search engine',
    'Web3 search engine',
    'Search engine for crypto users',
    'Search and Earn rewards',
    'Blockchain-based search engine',
    'AI Google alternative',
    'AI search rewards',
    'Secure AI search platform',
    'Privacy-first AI search',
    'Decentralized web search',
    'AI search with data privacy',
    'AI search with tokenomics',
    'Search engine for blockchain users',
    'SearchGPT by Athena',
    'Athena AI-powered search',
    'AI search engine rewards',
    'ChatGPT alternative search',
    'Best AI search engine',
    'Secure AI search engine',
    'AI-powered decentralized search',
    'Tokenized search rewards',
    'Privacy and rewards search engine',
    'AI and Web3 search',
    'Athena AI SearchGPT',
    'theathena.ai search engine',
    'Athena AI Learn and Earn',
    'Athena AI privacy search',
    'Athena AI rewards search',
    'Athena AI vs Google Search',
    'SearchGPT by Athena AI',
    'Athena Learn-to-Earn platform',
    'Athena AI rewards engine',
    'AI-powered Athena search',
    'Athena AI Web3 search platform',
    'Athena search tokenomics',
    'Athena AI blockchain search',
    'Athena AI decentralized search',
    'Athena AI privacy-focused search'
  ],
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@abid'
  },
  icons: ['https://www.theathena.ai/logo.svg']
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800&family=Roboto+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>TheAthena.ai</title>
        <meta
          name="description"
          content="Athena SearchGPT: Learn to Earn Search Platform."
        />
        <meta
          name="keywords"
          content="TheAthena.ai,TheAthena,searchGPT,Athena SearchGPT,Search Platform,ai,gpt,rewards,AI-powered search engine,AI search engine,Decentralized search engine,Privacy-focused search engine,AI-driven search engine,GPT-powered search engine,Learn and Earn search engine,Web3 search engine,Search engine for crypto users,Search and Earn rewards,Blockchain-based search engine,AI Google alternative,AI search rewards,Secure AI search platform,Privacy-first AI search,Decentralized web search,AI search with data privacy,AI search with tokenomics,Search engine for blockchain users,SearchGPT by Athena,Athena AI-powered search,AI search engine rewards,ChatGPT alternative search,Best AI search engine,Secure AI search engine,AI-powered decentralized search,Tokenized search rewards,Privacy and rewards search engine,AI and Web3 search,Athena AI SearchGPT,theathena.ai search engine,Athena AI Learn and Earn,Athena AI privacy search,Athena AI rewards search,Athena AI vs Google Search,SearchGPT by Athena AI,Athena Learn-to-Earn platform,Athena AI rewards engine,AI-powered Athena search,Athena AI Web3 search platform,Athena search tokenomics,Athena AI blockchain search,Athena AI decentralized search,Athena AI privacy-focused search"
        />

        <meta property="og:title" content="TheAthena.ai" />
        <meta
          property="og:description"
          content="Athena SearchGPT: Learn to Earn Search Platform."
        />
        <meta property="og:image" content="https://theathena.ai/logo.svg" />
        <meta property="og:url" content="https://theathena.ai" />
        <meta property="og:type" content="website" />
        <meta
          name="google-site-verification"
          content="TMsJ43oR1s_rX8TcZrBCM538U1hdtB3GbUV5Tzi6_8o"
        />
        <meta
          name="description"
          content="Athena SearchGPT: Learn to Earn Search Platform."
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

        {/* Structured Data (Schema.org) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://theathena.ai',
            '@type': 'WebPage',
            name: 'TheAthena.ai',
            description: 'Athena SearchGPT: Learn to Earn Search Platform.',
            url: 'https://theathena.ai'
          })}
        </script>
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

      <body
        style={{
          fontFamily: 'Jost, sans-serif'
        }}
      >
        <ThirdwebProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <AppStateProvider>
              <AI>
                <Header />
              </AI>
              {children}
              {/* <Sidebar /> */}
              <Footer />
              <Toaster />
            </AppStateProvider>
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  )
}
