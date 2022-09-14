import React from 'react'
import { MobileContainer } from '@//:modules/content/PageLayout'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import RootPublicClubRichObject from './RootPublicClubRichObject/RootPublicClubRichObject'

export default function EmptyPublicClub (): JSX.Element {
  return (
    <>
      <RootPublicClubRichObject />
      <MobileContainer>
        <NotFoundClub />
      </MobileContainer>
    </>
  )
}
