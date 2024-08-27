'use client'
import React from 'react'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { client } from '../../../../lib/utils/thirdweb-client'
import { lightTheme } from 'thirdweb/react'
import { createWallet, walletConnect, inAppWallet } from 'thirdweb/wallets'

export const WalletConnectThirdweb: React.FC = () => {
  const account = useActiveAccount()
  let isConnected = !!account

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
  return (
    <div className={`${isConnected ? 'connected' : 'connect'}`}>
      <ConnectButton
        client={client}
        wallets={wallets}
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
  )
}

export default WalletConnectThirdweb
