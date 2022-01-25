import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import type { ReviewFragment$key } from '@//:artifacts/ReviewFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import { GlobalVideoManagerProvider, PostVideoManagerProvider } from '@//:modules/content/Posts'
import PostReview from './PostReview/PostReview'

interface Props {
  query: ReviewFragment$key
}

const ReviewFragmentGQL = graphql`
  fragment ReviewFragment on Post {
    ...PostReviewFragment
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
      <GlobalVideoManagerProvider>
        <PostVideoManagerProvider>
          <PostReview query={data} />
        </PostVideoManagerProvider>
      </GlobalVideoManagerProvider>
    </>
  )
}
