import React, { ReactNode, Suspense } from 'react'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { ContentContainer } from '@//:modules/content/PageLayout'

interface Props {
  children: ReactNode
}

const SuspenseStack = (): JSX.Element => {
  return (
    <ContentContainer>
      <SkeletonStack />
    </ContentContainer>
  )
}

export default function SuspenseLazyClub (props: Props): JSX.Element {
  const { children } = props

  return (
    <Suspense fallback={<SuspenseStack />}>
      {children}
    </Suspense>
  )
}
