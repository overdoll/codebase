import { Flex, Heading } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderClubFragment$key } from '@//:artifacts/PostHeaderClubFragment.graphql'
import { ResourceIcon } from '../../../../PageLayout'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'
import { LinkTile } from '../../../../ContentSelection'

const Fragment = graphql`
  fragment PostHeaderClubFragment on Post {
    club {
      id
      name
      slug
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
    <LinkTile
      borderRadius='base'
      href={{
        pathname: '/[slug]',
        query: { slug: data.club.slug }
      }}
    >
      <Flex align='center'>
        <ResourceIcon
          showBorder
          h={8}
          w={8}
          mr={3}
          seed={data?.club?.id}
          query={data?.club?.thumbnail as ResourceIconFragment$key}
        />
        <Heading color='gray.00' fontSize='lg'>
          {data?.club?.name}
        </Heading>
      </Flex>
    </LinkTile>
  )
}
