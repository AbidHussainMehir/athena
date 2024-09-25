'use client'

import * as React from 'react'
import ChartsIndex from './components/dashboard/chartsIndex'
import { CardDescription, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useTheme } from 'next-themes'
// import ChartsIndex from '@/components/dashboard/chartsIndex'

export default function Page() {
  const { theme } = useTheme()

  const logoSrc = theme === 'dark' ? '/logo_dark.svg' : '/presale.svg'
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <main className="grid flex-1 items-center justify-center gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 ">
          {/* <CardTitle className="text-center">Athena Presale</CardTitle>
          <CardDescription className="text-center">
            Invest In the Future of AI, Web3 and Search
          </CardDescription> */}
          <div
            className="container mx-auto p-4 md:p-6 md:pt-0 lg:p-8 lg:pt-0 pt-0"
            style={{ paddingTop: '0px !important' }}
          >
            <div className="flex justify-center" style={{ maxWidth: '45vw' }}>
              <Image
                src={logoSrc}
                // alt="Your SVG image"
                // className="w-48 md:w-64 lg:w-80"
                alt="Your SVG image"
                width={48}
                height={48}
                layout="responsive" // Add the layout property
                className="w-full"
              />
            </div>
          </div>
        </main>
        <main
          className={`grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 ${
            theme == 'dark' ? 'bg-muted/40' : 'bg-[#F4f7fc]'
          }`}
        >
          <ChartsIndex />
        </main>
      </div>
    </main>
  )
}
