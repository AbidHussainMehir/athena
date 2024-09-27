'use client'
import React from 'react'
import Link from 'next/link'
import { SiDiscord, SiGmail, SiTelegram, SiTwitter } from 'react-icons/si'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

const Footer: React.FC = () => {
  const theme = useTheme()

  const pathname = usePathname()
  const isDashboard = pathname === '/dashboard'
  const linksClick = (linkText: any) => {
    window._mtm.push({
      event: 'menu-clicks-tracking',
      'event-category': 'menu-clicks',
      'event-value': linkText,
      'event-action': `${document.title} - ${window.location.href}`
    })
  }
  const socialLinksClick = (linkText: any) => {
    window._mtm.push({
      event: 'social-media-icons-tracking',
      'event-category': 'social-media-icons',
      'event-value': linkText,
      'event-action': `${document.title} - ${window.location.href}`
    })
  }
  React.useEffect(() => {
    return () => {
      localStorage.setItem('theme', 'dark')
    }
  }, [])
  return (
    <>
      <footer
        className={`w-[100%] p-1 md:p-2  pt-2  ${
          isDashboard ? '' : 'fixed bottom-0 right-0'
        } `}
        style={{
          backgroundColor: theme?.theme === 'light' ? '#fff' : '#0A0A0A'
        }}
      >
        {!pathname.includes('search') && !pathname.includes('share') && (
          <div className="flex flex-wrap mb-4  gap-1 md:gap-4 w-full justify-center">
            <span
              className={`${
                theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
              } rounded-lg`}
            >
              <Button
                className="px-1 md:px-2 h-8"
                variant={'ghost'}
                size={'md'}
              >
                <Link
                  onClick={() => linksClick('dashboard')}
                  href={'/dashboard'}
                >
                  Dashboard
                </Link>
              </Button>
            </span>
            <span
              className={`${
                theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
              } rounded-lg`}
            >
              <Button
                className="px-1 md:px-2 h-8"
                variant={'ghost'}
                size={'md'}
              >
                <Link
                  onClick={() => linksClick('https://docs.theathena.ai')}
                  href="https://docs.theathena.ai"
                  className="mx-2"
                  target="_blank"
                >
                  Docs
                </Link>
              </Button>
            </span>
            <span
              className={`${
                theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
              } rounded-lg`}
            >
              <Button
                className="px-1 md:px-2 h-8"
                variant={'ghost'}
                size={'md'}
              >
                <Link
                  onClick={() => linksClick('deck')}
                  href="/deck_doc.pdf"
                  className="mx-2"
                  target="_blank"
                >
                  Deck
                </Link>
              </Button>
            </span>
            {/* <span
          className={`${
            theme?.theme === 'dark' ? 'tag-dark' : 'tag-white'
          } rounded-lg`}
        >
          <Button
            className="px-1 md:px-2  w-8 h-8 "
            variant={'ghost'}
            size={'icon'}
          >
            <Link
              onClick={() => socialLinksClick('discord')}
              href="https://discord.gg/zRxaseCuGq"
              target="_blank"
            >
              <SiDiscord color="dark" size={18} />
            </Link>
          </Button>
        </span>
        <span
          className={`${
            theme?.theme === 'dark' ? 'tag-dark' : 'tag-white'
          } rounded-lg`}
        >
          <Button
            className="px-1 md:px-2  w-8 h-8"
            variant={'ghost'}
            size={'icon'}
          >
            <Link
              onClick={() => socialLinksClick('twitter')}
              href="https://twitter.com/theathena"
              target="_blank"
            >
              <SiTwitter size={18} />
            </Link>
          </Button>
        </span>
        <span
          className={`${
            theme?.theme === 'dark' ? 'tag-dark' : 'tag-white'
          } rounded-lg`}
        >
          <Button
            className="px-1 md:px-2  w-8 h-8"
            variant={'ghost'}
            size={'icon'}
          >
            <Link
              onClick={() => socialLinksClick('telegram')}
              href="https://twitter.com/theathena"
              target="_blank"
            >
              <SiTelegram size={18} />
            </Link>
          </Button>
        </span>
        <span
          className={`${
            theme?.theme === 'dark' ? 'tag-dark' : 'tag-white'
          } rounded-lg`}
        >
          <Button
            className="px-1 md:px-2  w-8 h-8"
            variant={'ghost'}
            size={'icon'}
          >
            <Link
              onClick={() => socialLinksClick('mail')}
              href="mailto:hello@theathena.ai"
              target="_blank"
            >
              <SiGmail size={18} />
            </Link>
          </Button>
        </span> */}
          </div>
        )}
      </footer>
    </>
  )
}
// _paq.push(['trackEvent', 'Menu', 'Freedom']);
// _paq.push(['trackEvent', 'CATEGORY', 'ACTION','EVENT_NAME(optional)','EVENT_VALUE(optional)']);
// _paq.push(['trackEvent', 'FormSubmission', 'page','EVENT_NAME(optional)','EVENT_VALUE(optional)']);

export default Footer
