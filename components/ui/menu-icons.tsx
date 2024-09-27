'use client'
import { useTheme } from 'next-themes'
import { Button } from './button'

function MenuIcon() {
  const { theme } = useTheme()

  const logoSrc = theme === 'light' ? '/images/newlogo.svg' : '/newlogodark.svg'
  return (
    <>
      <img
        className=" mt-2 	 rounded-full"
        style={{
          boxShadow:
            theme !== 'light'
              ? 'rgba(255, 255, 255, 0.2) 0px 4px 8px 0px, rgba(255, 255, 255, 0.5) 0px 6px 20px 0px'
              : 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.5) 0px 6px 20px 0px'
        }}
        src={logoSrc}
        // style={{ position: 'absolute', top: -5, left: -10 }}
        height={'50px'}
        width={'50px'}
      />
    </>
  )
}

export { MenuIcon }
