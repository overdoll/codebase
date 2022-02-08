import { Flex, Heading } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderClubFragment$key } from '@//:artifacts/PostHeaderClubFragment.graphql'
import { ClickableBox, ResourceIcon } from '../../../../PageLayout'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'
import { Link } from '../../../../../routing'

const Fragment = graphql`
  fragment PostHeaderClubFragment on Post {
    club {
      name
      slug
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

interface Props {
  query: PostHeaderClubFragment$key | null
}

export default function PostHeaderClub ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Link to={`/${data?.club?.slug as string}`}>
      <ClickableBox bg='transparent' p={0}>
        <Flex align='center'>
          <ResourceIcon h={8} w={8} mr={3} query={data?.club?.thumbnail as ResourceIconFragment$key} />
          <Heading color='gray.00' fontSize='lg'>
            {data?.club?.name}
          </Heading>
        </Flex>
      </ClickableBox>
    </Link>
  )
}
