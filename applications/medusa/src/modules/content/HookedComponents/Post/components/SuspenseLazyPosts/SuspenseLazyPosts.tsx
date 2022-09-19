import React, { ReactNode, Suspense } from 'react'
import { SkeletonStack } from '../../../../Placeholder'

interface Props {
  children: ReactNode
}

export default function SuspenseLazyPosts (props: Props): JSX.Element {
  const { children } = props

  return (
    <Suspense fallback={<SkeletonStack />}>
      {children}
    </Suspense>
  )
}
