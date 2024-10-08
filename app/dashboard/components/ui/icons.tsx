'use client'
import { useTheme } from 'next-themes'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  const { theme } = useTheme()
  const logoSrc = theme === 'light' ? '/logo.svg' : '/logo-white.svg'
  return (
    <>
      <img
        src={logoSrc}
        height={'250rem'}
        width={'290rem'}
        style={{ marginLeft: '5px' }}
      />
    </>
  )
}

export { IconLogo }
