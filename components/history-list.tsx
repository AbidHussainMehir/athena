import React, { cache } from 'react'
import HistoryItem from './history-item'
import { Chat } from '@/lib/types'
import { ClearHistory } from './clear-history'

type HistoryListProps = {
  userId?: string
}

// Start of Selection
export async function HistoryList({ userId }: HistoryListProps) {
  return (
    <div className="flex flex-col flex-1 space-y-3 h-full">
      <div className="flex flex-col space-y-0.5 flex-1 overflow-y-auto"></div>
      <div className="mt-auto">
        <ClearHistory empty={false} />
      </div>
    </div>
  )
}
