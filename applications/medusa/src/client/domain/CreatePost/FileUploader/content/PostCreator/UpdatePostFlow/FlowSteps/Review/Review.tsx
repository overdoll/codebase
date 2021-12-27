import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Stack } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { ReviewFragment$key } from '@//:artifacts/ReviewFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import PostGalleryContent from '../../../../../../../../components/Posts/PostGalleryContent/PostGalleryContent'
import PostBrand from '../../../../../../../../components/Posts/PostBrand/PostBrand'
import { Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
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
    ...PostBrandFragment
  }
`

export default function Review ({
  uppy,
  state,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(ReviewFragmentGQL, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
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
        <PostBrand query={data} />
        <PostGalleryContent query={data} />
      </Stack>
    </>
  )
}
