'use client'
import React from 'react'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { client } from '../lib/utils/thirdweb-client'
import { inAppWallet, createWallet } from 'thirdweb/wallets'
import { darkTheme } from 'thirdweb/react'

const wallets = [
  createWallet('io.metamask'),
  createWallet('com.trustwallet.app'),
  createWallet('org.uniswap'),
  createWallet('com.coinbase.wallet'),
  createWallet('com.ledger'),
  createWallet('app.phantom'),
  createWallet('com.enkrypt')
]

export const WalletConnectThirdweb: React.FC = () => {
  const account = useActiveAccount()
  let isConnected = !!account

  return (
    <div className={`${isConnected ? 'connected' : 'connect'}`}>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={darkTheme({
          colors: {
            borderColor: '#23b34e',
            accentText: '#e4e7ec',
            separatorLine: '#d4bfbf',
            primaryButtonBg: '#230aa4',
            primaryButtonText: '#fafafa',
            secondaryButtonBg: '#171616',
            accentButtonBg: '#ededed',
            connectedButtonBg: '#0c0d0c',
            accentButtonText: '#ececf4',
            connectedButtonBgHover: '#050505',
            tertiaryBg: '#121111',
            skeletonBg: '#c08c8c',
            secondaryIconHoverBg: '#070808'
          }
        })}
        connectButton={{ label: 'Connect Wallet ' }}
        connectModal={{
          size: 'compact',
          title: 'Connect to Athena',
          showThirdwebBranding: false
        }}
      />
    </div>
  )
}

export default WalletConnectThirdweb
