'use client'
import { useTheme } from 'next-themes'
import { Button } from './button'

function MenuIcon() {
  const { theme } = useTheme()

  const logoSrc =
    theme === 'dark' ? '/header-icon-dark.svg' : '/header-icon.svg'
  return (
    <>
      <img src={logoSrc} height={'10rem'} width={'10rem'} />
    </>
  )
}

export { MenuIcon }
