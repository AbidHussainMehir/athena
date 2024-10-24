'use client'

import { cn } from '@/lib/utils'
import {
  BookCheck,
  Film,
  Image,
  MessageCircleMore,
  Newspaper,
  Repeat2,
  Search
} from 'lucide-react'
import React from 'react'
import { Separator } from './ui/separator'
import { useTheme } from 'next-themes'

type SectionProps = {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  title?: string
  separator?: boolean
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  size = 'md',
  title,
  separator = false
}) => {
  const { theme } = useTheme()
  const iconSize = 16
  const iconColor = theme === 'light' ? '#000' : 'rgb(202,241,222)'
  const iconClassName = 'mr-1.5 text-muted-foreground'
  let icon: React.ReactNode
  switch (title) {
    case 'Images':
      // eslint-disable-next-line jsx-a11y/alt-text
      icon = (
        <Image size={iconSize} className={iconClassName} color={iconColor} />
      )
      break
    case 'Videos':
      icon = (
        <Film size={iconSize} className={iconClassName} color={iconColor} />
      )
      break
    case 'Sources Analyzed':
      icon = (
        <Newspaper
          size={iconSize}
          className={iconClassName}
          color={iconColor}
        />
      )
      break
    case `Athena's Answer`:
      icon = (
        <BookCheck
          size={iconSize}
          className={iconClassName}
          color={iconColor}
        />
      )
      break
    case 'Related':
      icon = (
        <Repeat2 size={iconSize} className={iconClassName} color={iconColor} />
      )
      break
    case 'Follow-up':
      icon = (
        <MessageCircleMore
          size={iconSize}
          className={iconClassName}
          color={iconColor}
        />
      )
      break
    default:
      icon = (
        <Search size={iconSize} className={iconClassName} color={iconColor} />
      )
  }

  return (
    <>
      {separator && <Separator className="my-2 bg-primary/10" />}
      <section
        className={cn(
          ` ${size === 'sm' ? 'py-1' : size === 'lg' ? 'py-4' : 'py-2'}`,
          className
        )}
      >
        {title && (
          <h2
            className="flex items-center leading-none py-2"
            style={{ color: theme === 'light' ? '#000' : 'rgb(202,241,222)' }}
          >
            {icon}
            {title}
          </h2>
        )}
        {children}
      </section>
    </>
  )
}
