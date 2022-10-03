import { MobileContainer } from '@//:modules/content/PageLayout'
import React from 'react'
import SkeletonStack from '../SkeletonStack/SkeletonStack'

export default function SuspenseGeneric (): JSX.Element {
  return (
    <MobileContainer>
      <SkeletonStack />
    </MobileContainer>
  )
}
