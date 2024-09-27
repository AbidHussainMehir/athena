'use client'
import { useTheme } from 'next-themes'
import { Button } from './button'

function MenuIcon() {
  const { theme } = useTheme()

  const logoSrc =
    theme === 'light' ? '/header-icon.svg' : '/header-icon-dark.svg'
  return (
    <>
      <img src={logoSrc} height={'35rem'} width={'40rem'} />
    </>
  )
}

export { MenuIcon }
