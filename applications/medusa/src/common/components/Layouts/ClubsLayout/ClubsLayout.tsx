import type { ReactNode } from 'react'
import { LargeBackgroundBox, MobileContainer } from '@//:modules/content/PageLayout'
import ClubsLayoutButtons from './ClubsLayoutButtons/ClubsLayoutButtons'

interface Props {
  children: ReactNode
}

export default function ClubsLayout ({ children }: Props): JSX.Element {
  return (
    <>
      <MobileContainer pt={2}>
        <LargeBackgroundBox mb={4} p={2}>
          <ClubsLayoutButtons />
        </LargeBackgroundBox>
      </MobileContainer>
      {children}
    </>
  )
}
