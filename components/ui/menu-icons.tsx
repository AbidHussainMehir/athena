'use client'
import { useTheme } from 'next-themes'
import { Button } from './button'

function MenuIcon() {
  const { theme } = useTheme()

  const logoSrc =
    theme === 'dark' ? '/header-icon-dark.svg' : '/header-icon.svg'
  return (
    <>
      <img src={'/newlogo.svg'} height={'120rem'} width={'120rem'} />
    </>
  )
}

export { MenuIcon }
