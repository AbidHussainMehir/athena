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
const title = 'TheAthena.ai'
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
    'rewards'
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
        <meta property="og:title" content="TheAthena.ai" />
        <meta
          property="og:description"
          content="Athena SearchGPT: Learn to Earn Search Platform."
        />
        <meta property="og:image" content="https://theathena.ai/logo.svg" />
        <meta property="og:url" content="https://theathena.ai" />
        <meta property="og:type" content="website" />

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
