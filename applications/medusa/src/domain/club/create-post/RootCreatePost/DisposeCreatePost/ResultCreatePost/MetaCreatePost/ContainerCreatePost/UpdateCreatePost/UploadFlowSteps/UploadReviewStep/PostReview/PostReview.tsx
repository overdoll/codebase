import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostReviewFragment$key } from '@//:artifacts/PostReviewFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { RawCinematicContent } from '@//:modules/content/HookedComponents/Post'

interface Props {
  query: PostReviewFragment$key
}

const Fragment = graphql`
  fragment PostReviewFragment on Post {
    ...RawCinematicContentFragment
  }
`

export default function PostReview ({
  query
}: Props): JSX.Element {
  const data = useFragment<PostReviewFragment$key>(Fragment, query)

  return (
    <Stack spacing={2}>
      <RawCinematicContent postQuery={data} />
    </Stack>
  )
}
