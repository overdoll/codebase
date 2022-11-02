import { MobileContainer } from '@//:modules/content/PageLayout'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import React from 'react'

export default function SuspenseBrowseCharacters (): JSX.Element {
  return (
    <MobileContainer>
      <SkeletonStack />
    </MobileContainer>
  )
}
