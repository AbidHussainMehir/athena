'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/app/actions'
import { UserMessage } from './user-message'
import { ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { BiDislike, BiLike } from 'react-icons/bi'
import toast, { Toaster } from 'react-hot-toast';
import { useActiveAccount } from 'thirdweb/react'

export function LikeDisLike() {
  const { theme } = useTheme()
  const account = useActiveAccount()

  const [input, setInput] = useState('')
  const { submit } = useActions()
  const [, setMessages] = useUIState<typeof AI>()

  // State to track if user has liked or disliked
  const [hasLiked, setHasLiked] = useState(false)
  const [hasDisliked, setHasDisliked] = useState(false)

  const like = () => {
    window._paq.push(['trackEvent', 'like', 'like-text'])
    if (!hasLiked && !hasDisliked) {
      if (account?.address) {
        setHasLiked(true)
        toast('🤑 Reward Earned')
      } else {
        toast('🙁 Reward Missed - Connect Wallet')
      }
    }
  }

  const unLike = () => {
    window._paq.push(['trackEvent', 'unLike', 'unlike-text'])
    if (!hasLiked && !hasDisliked) {
      if (account?.address) {
        setHasDisliked(true)
        toast('🤑 Reward Earned')
      } else {
        toast('🙁 Reward Missed - Connect Wallet')
      }
    }
  }

  return (
    <div className="flex justify-end mt-2">
      <button
        aria-label="Like"
        className="text-blue-500 hover:text-blue-700 mr-2"
        onClick={like}
        disabled={hasLiked || hasDisliked} // Disable if already liked or disliked
      >
        <BiLike color='green' size={24} />
      </button>
      <button
        aria-label="Unlike"
        className="text-red-500 hover:text-red-700"
        onClick={unLike}
        disabled={hasLiked || hasDisliked} // Disable if already liked or disliked
      >
        <BiDislike color='red' size={24} />
      </button>
    </div>
  )
}
