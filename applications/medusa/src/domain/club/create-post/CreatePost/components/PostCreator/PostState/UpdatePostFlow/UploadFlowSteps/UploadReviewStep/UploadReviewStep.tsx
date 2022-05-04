import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import type { UploadReviewStepFragment$key } from '@//:artifacts/UploadReviewStepFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostReview from './PostReview/PostReview'
import { Stack } from '@chakra-ui/react'

interface Props {
  query: UploadReviewStepFragment$key
}

const Fragment = graphql`
  fragment UploadReviewStepFragment on Post {
    ...PostReviewFragment
  }
`

export default function UploadReviewStep ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
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
      <GlobalVideoManagerProvider>
        <PostReview query={data} />
      </GlobalVideoManagerProvider>
    </Stack>
  )
}
