import CreatePostRichObject from '../MetaCreatePost/CreatePostRichObject/CreatePostRichObject'
import { MobileContainer } from '@//:modules/content/PageLayout'
import { NotFoundClub } from '@//:modules/content/Placeholder'

export default function EmptyClubCreatePost (): JSX.Element {
  return (
    <>
      <CreatePostRichObject />
      <MobileContainer>
        <NotFoundClub />
      </MobileContainer>
    </>
  )
}
