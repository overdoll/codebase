import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import type { UploadReviewStepFragment$key } from '@//:artifacts/UploadReviewStepFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import PostReview from './PostReview/PostReview'
import { Stack } from '@chakra-ui/react'
import SuggestPrompt from '../../../../../SuggestPrompt/SuggestPrompt'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'

interface Props {
  query: UploadReviewStepFragment$key
}

const Fragment = graphql`
  fragment UploadReviewStepFragment on Post {
    content {
      isSupporterOnly
    }
    club {
      canCreateSupporterOnlyPosts
    }
    ...PostReviewFragment
  }
`

export const hasSupporterContent = (content): boolean => {
  const supporter = content.map((item) => item.isSupporterOnly) as boolean[]
  return supporter.includes(true)
}

export default function UploadReviewStep ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const contentIsSupporter = hasSupporterContent(data.content)

  return (
    <Stack spacing={8}>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Review your selections
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Make sure you like what you see before you submit the post
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <GlobalVideoManagerProvider>
        <PostReview query={data} />
      </GlobalVideoManagerProvider>
      <Stack spacing={2}>
        <SuggestPrompt>
          <Trans>
            Upon submission, your post will be reviewed by our moderation team to ensure it does not violate any club
            guidelines. Your post should be visible to the public within a day of submission.
          </Trans>
        </SuggestPrompt>
        {(contentIsSupporter && !data.club.canCreateSupporterOnlyPosts) && (
          <Alert
            status='warning'
          >
            <AlertIcon />
            <AlertDescription>
              <Trans>
                Creating supporter only posts has been disabled for your club. All content must not be marked as
                supporter only.
              </Trans>
            </AlertDescription>
          </Alert>
        )}
      </Stack>
    </Stack>
  )
}
