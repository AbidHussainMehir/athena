'use client'

import * as React from 'react'
import ChartsIndex from './components/dashboard/chartsIndex'
import { CardDescription, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useTheme } from 'next-themes'
// import ChartsIndex from '@/components/dashboard/chartsIndex'

export default function Page() {
  const { theme } = useTheme()

  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <main
          className={`grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 ${
            theme == 'light' ? 'bg-[#F4f7fc]' : 'bg-muted/40'
          }`}
        >
          <ChartsIndex />
        </main>
      </div>
    </main>
  )
}
