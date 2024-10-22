'use client'
import React from 'react'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { client } from '../../../../lib/utils/constants'

export const WalletConnectThirdweb: React.FC = () => {
  const account = useActiveAccount()
  let isConnected = !!account

  return (
    <div className={`${isConnected ? 'connected' : 'connect'}`}>
      <ConnectButton
        client={client}
        appMetadata={{
          name: 'Example App',
          url: 'https://example.com'
        }}
      />
    </div>
  )
}

export default WalletConnectThirdweb
