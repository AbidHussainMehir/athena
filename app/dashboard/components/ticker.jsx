import { useTheme } from 'next-themes'
import React from 'react'

const MoveStuffAround = () => {
  const theme = useTheme()
  return (
    <marquee
      behavior="scroll"
      direction="left"
      scrollamount="3"
      style={{
        color: theme?.theme === 'light' ? '#09090B' : '#fff',
        fontSize: '14px',
        fontWeight: '600',
        whiteSpace: 'nowrap'
      }}
    >
      Athena presale has been started
    </marquee>
  )
}

export default MoveStuffAround
