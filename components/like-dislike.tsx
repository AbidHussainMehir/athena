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
export function LikeDisLike() {
  const { theme } = useTheme()

  const [input, setInput] = useState('')
  const { submit } = useActions()
  const [, setMessages] = useUIState<typeof AI>()
  const like=()=>{
    window._paq.push(['trackEvent', 'like','like-text'])
  
  }
  const unLike=()=>{
  window._paq.push(['trackEvent', 'unLike','unlike-text'])
  }

  return (
    <div className="flex justify-end mt-2">
    <button 
        aria-label="Like" 
        className="text-blue-500 hover:text-blue-700 mr-2"
        onClick={() => { like(); }}
    >
        <BiLike color='green' size={24} /> {/* Adjust size as needed */}
    </button>
    <button 
        aria-label="Unlike" 
        className="text-red-500 hover:text-red-700"
        onClick={() => { unLike(); }}
    >
        <BiDislike color='red' size={24} /> {/* Adjust size as needed */}
    </button>
</div>

  )
}
