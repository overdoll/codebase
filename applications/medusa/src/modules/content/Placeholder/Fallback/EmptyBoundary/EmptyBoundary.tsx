import { ReactNode } from 'react'

interface EmptyBoundaryProps {
  fallback: ReactNode
  condition: boolean
  children: ReactNode
}

export default function EmptyBoundary ({
  fallback,
  condition,
  children
}: EmptyBoundaryProps): JSX.Element {
  if (condition) {
    return (
      <>
        {fallback}
      </>
    )
  }

  return (
    <>
      {children}
    </>
  )
}
