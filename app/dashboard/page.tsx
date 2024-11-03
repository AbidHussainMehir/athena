'use client'

import * as React from 'react'
import ChartsIndex from './components/dashboard/chartsIndex'
export default function Page() {

  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <ChartsIndex />
    </main>
  )
}
