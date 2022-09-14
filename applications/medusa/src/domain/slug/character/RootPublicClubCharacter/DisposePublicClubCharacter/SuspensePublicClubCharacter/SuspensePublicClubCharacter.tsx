import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { MobileContainer } from '@//:modules/content/PageLayout'
import React from 'react'

export default function SuspensePublicClubCharacter (): JSX.Element {
  return (
    <MobileContainer>
      <SkeletonPost />
    </MobileContainer>
  )
}
