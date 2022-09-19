import { Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import { RawCinematicContent } from '@//:modules/content/HookedComponents/Post'

interface Props {
  query: PostPreviewFragment$key
}

const Fragment = graphql`
  fragment PostPreviewFragment on Post {
    ...RawCinematicContentFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2} direction='column'>
      <RawCinematicContent postQuery={data} />
    </Stack>
  )
}
