'use client'
import React, { useEffect } from 'react'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import HistoryContainer from './history-container'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { client } from '../lib/utils/thirdweb-client'
import { ThirdwebProvider, lightTheme } from 'thirdweb/react'
import { createWallet, walletConnect, inAppWallet } from 'thirdweb/wallets'
import Link from 'next/link'
import { MenuIcon } from './ui/menu-icons'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useUIState } from 'ai/rsc'
import { AI } from '@/app/actions'

export const Header: React.FC = () => {
  const router = useRouter()
  const [, setMessages] = useUIState<typeof AI>()

  const account = useActiveAccount()
  let isConnected = !!account
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://analytics.theathena.ai/js/container_aJYRdJOn.js'
    document.head.appendChild(script)

    script.onload = () => {
      // Ensure _paq is initialized only once
      window._mtm = window._mtm || []
    }

    return () => {
      document.head.removeChild(script)
      // No need to clear _paq array to avoid duplicate entries in subsequent renders
    }
  }, [])
  const handleLogoClick = () => {
    window._mtm.push({
      event: 'logo-click',
      'event-category': 'logo-clicked',
      'event-action': `${document.title} - ${window.location.href}`
    })
  }

  const wallets = [
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    walletConnect(),
    inAppWallet({
      auth: {
        options: ['email', 'google', 'apple', 'facebook']
      }
    }),
    createWallet('com.trustwallet.app'),
    createWallet('app.phantom')
  ]
  const handleRedirect = () => {
    setMessages([])
    handleLogoClick()
    router.replace('/')
    setTimeout(() => {
      router.refresh()
    }, 1000)
    // router.refresh();
  }
  const handleConnectWallet = () => {
    window._mtm.push({
      event: 'wallet-button-clicked',
      'event-category': 'connect-wallet-button',
      'event-value': 'Connect Wallet',
      'event-action': `${document.title} - ${window.location.href}`
    })
  }

  useEffect(() => {
    try {
      if (account?.address) {
        localStorage.setItem('uid', account?.address)
        window._mtm.push({
          event: 'set_user_id',
          uid: account?.address
        })
      } else {
        localStorage.setItem('uid', 'anonymous')
        window._mtm.push({
          event: 'set_user_id',
          uid: 'anonymous'
        })
      }
    } catch (error) {}
  }, [account])

  useEffect(() => {
    try {
      if (account?.address) {
        localStorage.setItem('uid', account?.address)
        window._mtm.push({
          event: 'set_user_id',
          uid: account?.address
        })
      } else {
        localStorage.setItem('uid', 'anonymous')
        window._mtm.push({
          event: 'set_user_id',
          uid: 'anonymous'
        })
      }
    } catch (error) {}
  }, [])

  return (
    <header
      style={{ position: 'relative' }}
      className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none  md:bg-transparent"
    >
      <div>
        <span className="gap-3 flex justify-start align-center">
          {/* <Button className="mr-2" variant="ghost" size="icon"> */}
          <div style={{ cursor: 'pointer' }} id="logo" onClick={handleRedirect}>
            <MenuIcon />
          </div>
          {/* </Button> */}
        </span>
        <span className="sr-only">Athena</span>
      </div>
      <div className="flex ">
        <ModeToggle />

        {/* <span className="mr-2">
          <ModeToggle />
        </span> */}
        <HistoryContainer location="header" />
        <div
          onClick={handleConnectWallet}
          className={`${isConnected ? 'connected' : 'connect'}`}
        >
          <ConnectButton
            client={client}
            wallets={wallets}
            connectButton={{
              label: "Connect Wallet",
            }}
            
            theme={lightTheme({
              colors: {
                accentText: '#02337e',
                accentButtonBg: '#02337e',
                borderColor: '#363536',
                primaryButtonBg: '#090e95',
                primaryButtonText: '#f9f5f9',
                secondaryIconColor: '#544f72'
              }
            })}
            connectModal={{
              size: 'wide',
              title: ' Athena AI',
              welcomeScreen: {
                title: 'The Future of Search with AI and Web3',
                subtitle: 'Create or Connect to Your Wallet to Get Started '
              },
              showThirdwebBranding: false
            }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
