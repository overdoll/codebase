import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Stack } from '@chakra-ui/react'
import type { ReviewFragment$key } from '@//:artifacts/ReviewFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import PostGalleryContent from '../../../../../../../../../../modules/content/Posts/components/PostGalleryContent/PostGalleryContent'
import PostHeaderClub from '../../../../../../../../../../modules/content/Posts/components/Content/PostHeaderClub/PostHeaderClub'
import { Trans } from '@lingui/macro'
import PostIndexer from '../../../../../../../../../../modules/content/Posts/components/Interaction/PostIndexer/PostIndexer'

interface Props {
  query: ReviewFragment$key
}

const ReviewFragmentGQL = graphql`
  fragment ReviewFragment on Post {
    id
    content {
      urls {
        url
        mimeType
      }
    }
    ...PostGalleryContentFragment
    ...PostHeaderClubFragment
    club {
      name
    }
  }
`

export default function Review ({
  query
}: Props): JSX.Element {
  const data = useFragment(ReviewFragmentGQL, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Review your selections
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Make sure you like what you see before you submit the post.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <Stack spacing={2}>
        <PostHeaderClub query={data} />
        <PostGalleryContent query={data}>
          {({
            slidesCount,
            currentSlide
          }) =>
            <PostIndexer length={slidesCount} currentIndex={currentSlide} />}
        </PostGalleryContent>
      </Stack>
    </>
  )
}