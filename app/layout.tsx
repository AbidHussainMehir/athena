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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
