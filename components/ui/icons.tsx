'use client'
import { useTheme } from 'next-themes'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  const { theme } = useTheme()

  const logoSrc = theme === 'light' ? '/logo.svg' : '/logo-white.svg'
  return (
    <div
      style={{
        // boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px",
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
        // backgroundColor: '#fff'
      }}
    >
      <img
        src={logoSrc}
        // height={'300rem'}
        width={'480vw'}
        style={{ marginLeft: '5px' }}
      />
    </div>
  )
}

export { IconLogo }
