import { Flex, Heading } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderClubFragment$key } from '@//:artifacts/PostHeaderClubFragment.graphql'
import { ClickableBox, ResourceIcon } from '@//:modules/content/PageLayout'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'

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

  return (
    <ClickableBox bg='transparent' p={0}>
      <Flex align='center'>
        <ResourceIcon mr={3} query={data?.club?.thumbnail as ResourceIconFragment$key} />
        <Heading color='gray.00' fontSize='xl'>
          {data?.club?.name}
        </Heading>
      </Flex>
    </ClickableBox>
  )
}
