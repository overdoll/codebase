import { ReactNode } from 'react'

interface ChildrenBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

export default function ChildrenBoundary ({
  fallback,
  children
}: ChildrenBoundaryProps): JSX.Element {
  if (fallback == null) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <>
      {fallback}
    </>
  )
}
