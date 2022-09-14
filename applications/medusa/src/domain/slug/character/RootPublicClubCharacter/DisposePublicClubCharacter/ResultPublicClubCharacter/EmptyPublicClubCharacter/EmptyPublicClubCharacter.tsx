import React from 'react'
import { MobileContainer } from '@//:modules/content/PageLayout'
import { NotFoundCharacter } from '@//:modules/content/Placeholder'
import RootPublicClubRichObject
  from '../../../../../club/RootPublicClub/DisposePublicClub/ResultPublicClub/EmptyPublicClub/RootPublicClubRichObject/RootPublicClubRichObject'

export default function EmptyPublicClubCharacter (): JSX.Element {
  return (
    <>
      <RootPublicClubRichObject />
      <MobileContainer>
        <NotFoundCharacter />
      </MobileContainer>
    </>
  )
}
