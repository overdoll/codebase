import { MobileContainer } from '@//:modules/content/PageLayout'
import React from 'react'
import { SkeletonStack } from '@//:modules/content/Placeholder'

export default function SuspenseSearchCategory (): JSX.Element {
  return (
    <MobileContainer>
      <SkeletonStack />
    </MobileContainer>
  )
}
