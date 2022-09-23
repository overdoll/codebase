import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostReviewFragment$key } from '@//:artifacts/PostReviewFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { RawCinematicContent } from '@//:modules/content/HookedComponents/Post'
import isProcessed from '@//:modules/content/HookedComponents/Post/support/isProcessed'
import isFailed from '@//:modules/content/HookedComponents/Post/support/isFailed'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { Trans } from '@lingui/macro'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import PostStaticAudience
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostStaticAudience/PostStaticAudience'
import PostStaticCharacters
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostStaticCharacters/PostStaticCharacters'
import PostStaticCategories
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostStaticCategories/PostStaticCategories'
import { CategoryIdentifier, CharacterIdentifier, SecurityShield } from '@//:assets/icons'

interface Props {
  query: PostReviewFragment$key
}

const Fragment = graphql`
  fragment PostReviewFragment on Post {
    ...RawCinematicContentFragment
    ...isProcessedFragment
    ...isFailedFragment
    ...PostStaticAudienceFragment
    ...PostStaticCharactersFragment
    ...PostStaticCategoriesFragment
  }
`

export default function PostReview (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment<PostReviewFragment$key>(Fragment, query)

  const contentIsProcessed = isProcessed(data)
  const contentFailed = isFailed(data)

  return (
    <Stack spacing={2}>
      {(!contentIsProcessed && !contentFailed) && (
        <Alert
          status='info'
        >
          <AlertIcon />
          <AlertDescription>
            <Trans>
              Your content is still processing. You may submit your post. We'll notify you via email if we run into any
              processing errors after submission.
            </Trans>
          </AlertDescription>
        </Alert>
      )}
      {(contentFailed) && (
        <Alert
          status='warning'
        >
          <AlertIcon />
          <AlertDescription>
            <Trans>
              We ran into an error processing your content. Please remove it and try again before submitting your post.
            </Trans>
          </AlertDescription>
        </Alert>
      )}
      <RawCinematicContent postQuery={data} />
      <Stack spacing={4}>
        <Stack spacing={1}>
          <PageHeader
            icon={SecurityShield}
            title={<Trans>Suitable for an audience that looks for this content</Trans>}
          />
          <PostStaticAudience query={data} />
        </Stack>
        <Stack spacing={1}>
          <PageHeader icon={CharacterIdentifier} title={<Trans>Contains the following characters</Trans>} />
          <PostStaticCharacters query={data} />
        </Stack>
        <Stack spacing={1}>
          <PageHeader icon={CategoryIdentifier} title={<Trans>Is relevant to the following categories</Trans>} />
          <PostStaticCategories query={data} />
        </Stack>
      </Stack>
    </Stack>
  )
}
