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
        // style={{ position: 'absolute', top: -5, left: -10 }}
        height={'160rem'}
        width={'160rem'}
      />
    </>
  )
}

export { MenuIcon }
