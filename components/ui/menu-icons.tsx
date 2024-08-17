'use client'
import { useTheme } from 'next-themes'
import { Button } from './button'

function MenuIcon() {
  const { theme } = useTheme()

  const logoSrc =
    theme === 'dark' ? '/header-icon-dark.svg' : '/header-icon.svg'
  return (
    <>
      <img
        className="ml-[-20px]"
        src={'/newlogo.svg'}
        height={'140rem'}
        width={'120rem'}
      />
    </>
  )
}

export { MenuIcon }
