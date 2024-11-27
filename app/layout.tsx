'use client'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { ThirdwebProvider } from 'thirdweb/react'
import Head from 'next/head'
import { useUIState } from 'ai/rsc'
import { AI } from '@/app/actions'

const title = 'Athena SearchGPT'
const description = 'Athena SearchGPT: Learn to Earn Search Platform.'
export const metadata = {
  title: {
    default: 'TheAthena.ai',
    template: '%s | TheAthena.ai',
  },
  description: 'Athena SearchGPT: Learn to Earn Search Platform.',
  keywords: [
    'TheAthena.ai',
    'searchGPT',
    'Learn and Earn',
    'AI',
    'Web3',
    'Decentralized Search',
  ],
  openGraph: {
    title: 'TheAthena.ai',
    description: 'Athena SearchGPT: Learn to Earn Search Platform.',
    url: 'https://theathena.ai',
    siteName: 'TheAthena.ai',
    images: [
      {
        url: 'https://theathena.ai/logo.svg',
        width: 800,
        height: 600,
        alt: 'TheAthena.ai Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheAthena.ai',
    description: 'Athena SearchGPT: Learn to Earn Search Platform.',
    images: ['https://theathena.ai/logo.svg'],
  },
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        {/* Preconnect for Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800&family=Roboto+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Page Title */}
        <title>TheAthena.ai</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Athena SearchGPT: Learn to Earn Search Platform."
        />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="TheAthena.ai, searchGPT, AI-powered search engine, Learn and Earn, Web3 search engine, decentralized search"
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

        {/* Canonical URL */}
        <link rel="canonical" href="https://theathena.ai" />

        {/* Structured Data (Schema.org) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "TheAthena.ai",
            description: "Athena SearchGPT: Learn to Earn Search Platform.",
            url: "https://theathena.ai"
          })}
        </script>

        {/* Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
            <Header />
            {children}
            {/* <Sidebar /> */}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  )
}
