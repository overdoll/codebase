import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  disabled?: boolean
  href: string
}

/**
 * Opens links in a new tab
 */
export default function ExternalLink ({
  children,
  disabled = false,
  href
}: Props): JSX.Element {
  if (disabled) {
    return (
      <span>
        {children}
      </span>
    )
  }

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={href}
    >
      {children}
    </a>
  )
}
