import { MobileContainer } from '@//:modules/content/PageLayout'
import React from 'react'
import { SkeletonPost } from '@//:modules/content/Placeholder'

export default function SuspenseRandom (): JSX.Element {
  return (
    <MobileContainer>
      <SkeletonPost />
    </MobileContainer>
  )
}
