import { MobileContainer } from '@//:modules/content/PageLayout'
import React from 'react'
import { CenteredSpinner } from '@//:modules/content/Placeholder'

export default function SuspensePublicClub (): JSX.Element {
  return (
    <MobileContainer>
      <CenteredSpinner />
    </MobileContainer>
  )
}
