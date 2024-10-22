'use client'
import React, { useEffect } from 'react'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { ThirdwebProvider, lightTheme } from 'thirdweb/react'
import { createWallet, walletConnect, inAppWallet } from 'thirdweb/wallets'
import Link from 'next/link'
import { MenuIcon } from './ui/menu-icons'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import { client } from '../lib/utils/constants'
export const MyComponent: React.FC = () => {
  const router = useRouter()
  const { theme } = useTheme()
  const pathname = usePathname()

  const isDashboard = pathname === '/dashboard'

  const account = useActiveAccount()
  let isConnected = !!account

  const logoSrc = theme === 'light' ? '/presale.svg' : '/logo_dark.svg'

  return (
    <header
      style={{ position: 'relative' }}
      className="fixed w-full  py-0 px-1 md:px-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none  md:bg-transparent"
    >
      <div>
        <span className="gap-3 flex justify-start align-center">
          {/* <Button className="mr-2" variant="ghost" size="icon"> */}
          <div style={{ cursor: 'pointer' }} id="logo">
            <MenuIcon />
          </div>
          {/* </Button> */}
        </span>
        <span className="sr-only">Athena</span>
      </div>
      {/* {
        isDashboard &&
        <div className="flex ">
          <img
            src={logoSrc}
            style={{ paddingLeft: '10px' }}
            alt="Your SVG image"
            width="180px"
            height="180px"

          />
        </div>
      } */}

      <div className="flex ">
        <ModeToggle />

        {/* <span className="mr-2">
          <ModeToggle />
        </span> */}
        <div className={`${isConnected ? 'connected' : 'connect'}`}>
          <ConnectButton
            client={client}
            appMetadata={{
              name: 'Example App',
              url: 'https://example.com'
            }}
          />
        </div>
        {isConnected && (
          <div
            className="non-mobile ms-3"
            style={{
              cursor: 'pointer',
              height: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Link
              legacyBehavior
              href={'/dashboard'}
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={
                  theme === 'light'
                    ? '/images/profile_icon.svg'
                    : '/images/profile_icon_dark.svg'
                }
                width={'35px'}
                height={'35px'}
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default function Header() {
  return <MyComponent />
}
