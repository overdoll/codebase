import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HomePostFragment$key } from '@//:artifacts/HomePostFragment.graphql'
import { HomePostViewerFragment$key } from '@//:artifacts/HomePostViewerFragment.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import { useContext } from 'react'
import {
  PostFooter,
  PostGallerySimpleContent,
  PostHeaderClub,
  PostIndexer,
  PostLikeButton,
  PostManagerContext,
  PostMenu
} from '../../../../../modules/content/Posts'
import JoinClubButton from '../../../ManageClub/components/JoinClubButton/JoinClubButton'

interface Props {
  query: HomePostFragment$key | null
  viewerQuery: HomePostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment HomePostFragment on Post {
    ...PostGallerySimpleContentFragment
    ...PostMenuFragment
    ...PostLikeButtonFragment
    ...PostHeaderClubFragment
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    club {
      ...JoinClubButtonClubFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment HomePostViewerFragment on Account {
    ...JoinClubButtonViewerFragment
  }
`

export default function HomePost ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const data = useFragment<HomePostFragment$key>(PostFragment, query)
  const viewerData = useFragment<HomePostViewerFragment$key>(ViewerFragment, viewerQuery)

  const {
    slidesCount,
    currentSlide
  } = useContext(PostManagerContext)

  return (
    <Stack spacing={1}>
      <HStack spacing={3} justify='space-between' align='center'>
        <PostHeaderClub query={data} />
        <JoinClubButton size='md' clubQuery={data?.club ?? null} viewerQuery={viewerData} />
      </HStack>
      <PostGallerySimpleContent query={data} />
      <PostFooter
        leftItem={<PostLikeButton query={data} />}
        centerItem={<PostIndexer
          length={slidesCount}
          currentIndex={currentSlide}
                    />}
        rightItem={<PostMenu query={data} />}
      />
    </Stack>
  )
}
