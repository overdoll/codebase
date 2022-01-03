import { Flex, Heading } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderClubFragment$key } from '@//:artifacts/PostHeaderClubFragment.graphql'
import { ResourceIcon } from '@//:modules/content/PageLayout'

const Fragment = graphql`
  fragment PostHeaderClubFragment on Post {
    club {
      name
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

interface Props {
  query: PostHeaderClubFragment$key
}

export default function PostHeaderClub ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data?.club?.thumbnail == null) return <></>

  return (
    <Flex align='center'>
      <ResourceIcon mr={2} query={data?.club?.thumbnail} />
      <Heading color='gray.00' fontSize='xl'>
        {data?.club?.name}
      </Heading>
    </Flex>
  )
}
