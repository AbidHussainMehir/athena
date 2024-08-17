'use client'
import { useTheme } from 'next-themes'
import { Button } from './button'

function MenuIcon() {
  const { theme } = useTheme()

  const logoSrc = theme === 'dark' ? '/newlogodark.svg' : '/newlogo.svg'
  return (
    <>
      <img
        className="ml-[-20px]"
        src={logoSrc}
        height={'140rem'}
        width={'120rem'}
      />
    </>
  )
}

export { MenuIcon }
