'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { AI, UIState } from '@/app/actions'
import { useUIState, useActions, useAIState } from 'ai/rsc'
import { cn } from '@/lib/utils'
import { UserMessage } from './user-message'
import { Button } from './ui/button'
import { ArrowRight, Plus } from 'lucide-react'
import { EmptyScreen } from './empty-screen'
import Textarea from 'react-textarea-autosize'
import { generateId } from 'ai'
import { useAppState } from '@/lib/utils/app-state'
import Typewriter from 'typewriter-effect'
import { IconLogo } from './ui/icons'
import { useTheme } from 'next-themes'
import toast from 'react-hot-toast'
import { useActiveAccount } from 'thirdweb/react'

interface ChatPanelProps {
  messages: UIState
  query?: string
}

export function ChatPanel({ messages, query }: ChatPanelProps) {
  const { theme } = useTheme()
  const account = useActiveAccount()

  const [input, setInput] = useState('')
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)
  const [, setMessages] = useUIState<typeof AI>()
  const [aiMessage, setAIMessage] = useAIState<typeof AI>()
  const { isGenerating, setIsGenerating } = useAppState()
  const { submit } = useActions()
  const router: any = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isFirstRender = useRef(true) // For development environment

  async function handleQuerySubmit(query: string, formData?: FormData) {
    setInput(query)
    setIsGenerating(true)

    // Add user message to UI state
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: generateId(),
        component: <UserMessage message={query} />
      }
    ])

    // Submit and get response message
    const data = formData || new FormData()
    if (!formData) {
      data.append('input', query)
    }
    const responseMessage = await submit(data)
    setMessages(currentMessages => [...currentMessages, responseMessage])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    handleSearch(input)
    await handleQuerySubmit(input, formData)
    window._paq.push(['trackEvent', 'source-click', input])
    if (account?.address) {
      toast('🤑Reward Earned', {
        style: {
          background: 'green',
          color: '#fff'
        }
      })
    } else {
      toast('🙁Reward Missed - Connect Wallet', {
        style: {
          background: 'red',
          color: '#fff'
        }
      })
    }
  }

  // if query is not empty, submit the query
  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
      handleQuerySubmit(query)
      isFirstRender.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  useEffect(() => {
    const lastMessage = aiMessage.messages.slice(-1)[0]
    if (lastMessage?.type === 'followup' || lastMessage?.type === 'inquiry') {
      setIsGenerating(false)
    }
  }, [aiMessage, setIsGenerating])
  const pathname = usePathname()
  const [previousPath, setPreviousPath] = useState<string | null>(null)

  useEffect(() => {
    // Update the previous path whenever the pathname changes
    if (pathname !== previousPath) {
      setPreviousPath(pathname)
    }
  }, [pathname])

  useEffect(() => {
    // Handle side effects when pathname changes
    if (previousPath === null && pathname === '/') {
      handleClear()
    }
    // Clear state or reset layout here
  }, [pathname])
  useEffect(() => {
    if (pathname === '/') {
      handleClear()
    }
  }, [pathname])
  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     handleClear()
  //       };

  //   router?.events?.on('routeChangeStart', handleRouteChange);

  //   return () => {
  //     router?.events?.off('routeChangeStart', handleRouteChange);
  //   };
  // }, [router?.events]);
  // Clear messages
  const handleClear = () => {
    setIsGenerating(false)
    setMessages([])
    setAIMessage({ messages: [], chatId: '' })
    setInput('')
    router.push('/')
  }
  const handleSearch = (inp: any) => {
    window._mtm.push({
      event: 'site-search-keywords-tracking',
      'event-category': 'site-search-keywords',
      'event-value': inp,
      'event-action': `${document.title} - ${window.location.href}`
    })
  }
  useEffect(() => {
    // focus on input when the page loads
    inputRef.current?.focus()
  }, [])

  // If there are messages and the new button has not been pressed, display the new Button
  if (messages.length > 0) {
    return (
      <div className="fixed bottom-8 md:bottom-8 left-0 right-0 flex justify-center items-center mx-auto pointer-events-none">
        <Button
          type="button"
          variant={'secondary'}
          className="rounded-full bg-secondary/80 group transition-all hover:scale-105 pointer-events-auto"
          onClick={() => handleClear()}
          disabled={isGenerating}
        >
          <span className="text-sm mr-2 group-hover:block hidden animate-in fade-in duration-300">
            New
          </span>
          <Plus size={18} className="group-hover:rotate-90 transition-all" />
        </Button>
      </div>
    )
  }

  if (query && query.trim().length > 0) {
    return null
  }

  return (
    <div
      className={
        'fixed bottom-8 left-0 right-0 top-10 mx-auto h-screen flex flex-col items-center justify-center'
      }
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mb-[200px] md:mb-[100px] w-full px-6"
      >
        <div
          className="md:text-sm mb-5 text-lg relative mb-1 w-[100%] flex items-center w-full  "
          style={{
            fontWeight: 500,
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%'
          }}
        >
          <IconLogo className="" />
        </div>
        <div
          className="md:text-sm text-lg relative mb-1 w-[100%] flex items-center w-full"
          style={{
            fontWeight: 500,
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%'
          }}
        >
          <div
            style={{
              fontWeight: 400,
              textAlign: 'center',
              width: '100%',
              height: '60px',
              fontSize: '18px'
            }}
          >
            <Typewriter
              options={{
                loop: true,
                delay: 80
              }}
              onInit={typewriter => {
                typewriter
                  .pauseFor(100)
                  .typeString('Privacy-Driven Learn to Earn Search Platform')
                  .pauseFor(400)
                  .start()
              }}
            />
          </div>
        </div>

        <div className="relative flex items-center w-full">
          <Textarea
            ref={inputRef}
            name="input"
            rows={1}
            maxRows={5}
            tabIndex={0}
            placeholder="ask Athena to learn and earn rewards"
            spellCheck={false}
            value={input}
            style={{
              boxShadow:
                theme === 'light'
                  ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                  : '0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19)',
              border: theme === 'light' ? '1px solid #000' : '1px solid #fff',
              borderRadius: '28px'
            }}
            className="resize-none w-full min-h-12 rounded-fill bg-muted border border-input pl-4 pr-10 pt-3 pb-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'"
            onChange={e => {
              setInput(e.target.value)
              setShowEmptyScreen(e.target.value.length === 0)
            }}
            onKeyDown={e => {
              // Enter should submit the form
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                // Prevent the default action to avoid adding a new line
                if (input.trim().length === 0) {
                  e.preventDefault()
                  return
                }
                e.preventDefault()
                const textarea = e.target as HTMLTextAreaElement
                textarea.form?.requestSubmit()
              }
            }}
            onHeightChange={height => {
              // Ensure inputRef.current is defined
              if (!inputRef.current) return

              // The initial height and left padding is 70px and 2rem
              const initialHeight = 70
              // The initial border radius is 32px
              const initialBorder = 32
              // The height is incremented by multiples of 20px
              const multiple = (height - initialHeight) / 20

              // Decrease the border radius by 4px for each 20px height increase
              const newBorder = initialBorder - 4 * multiple
              // The lowest border radius will be 8px
              // inputRef.current.style.borderRadius =
              //   Math.max(8, newBorder) + 'px'
            }}
            onFocus={() => setShowEmptyScreen(true)}
            onBlur={() => setShowEmptyScreen(false)}
          />
          <Button
            type="submit"
            size={'icon'}
            variant={'ghost'}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            disabled={input.length === 0}
            style={{ opacity: '10' }}
          >
            <img
              src={
                theme === 'light' ? '/search-icon.svg' : '/search-icon-dark.svg'
              }
            />
          </Button>
        </div>
        <EmptyScreen
          submitMessage={message => {
            setInput(message)
          }}
          className={cn(showEmptyScreen ? 'visible' : 'invisible')}
        />
      </form>
    </div>
  )
}
