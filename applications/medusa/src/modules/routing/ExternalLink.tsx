import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  disabled?: boolean
  to: string
}

/**
 * Opens links in a new tab
 */
export default function ExternalLink ({
  children,
  disabled = false,
  to
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
      href={to}
    >
      {children}
    </a>
  )
}
