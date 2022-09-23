import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadPostOptionsFragment$key } from '@//:artifacts/UploadPostOptionsFragment.graphql'
import PostAddDescription from './PostAddDescription/PostAddDescription'
import { HStack } from '@chakra-ui/react'

interface Props {
  query: UploadPostOptionsFragment$key
}

const Fragment = graphql`
  fragment UploadPostOptionsFragment on Post {
    ...PostAddDescriptionFragment
  }
`

export default function UploadPostOptions ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <HStack>
      <PostAddDescription query={data} />
    </HStack>
  )
}
