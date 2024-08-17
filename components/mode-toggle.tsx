import * as React from 'react'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setTheme('light')
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme}
      </button>
    </>
  )
}
