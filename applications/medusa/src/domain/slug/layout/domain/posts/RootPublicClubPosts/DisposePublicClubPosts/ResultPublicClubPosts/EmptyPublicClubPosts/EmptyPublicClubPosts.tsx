import React from 'react'
import { MobileContainer } from '@//:modules/content/PageLayout'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import RootPublicClubPostsRichObject from './RootPublicClubPostsRichObject/RootPublicClubPostsRichObject'

export default function EmptyPublicClubPosts (): JSX.Element {
  return (
    <>
      <RootPublicClubPostsRichObject />
      <MobileContainer>
        <NotFoundClub />
      </MobileContainer>
    </>
  )
}
