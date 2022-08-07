import { Flex, Heading } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderClubFragment$key } from '@//:artifacts/PostHeaderClubFragment.graphql'
import ClubThumbnail from '../../../../../DataDisplay/Club/ClubThumbnail/ClubThumbnail'

const Fragment = graphql`
  fragment PostHeaderClubFragment on Post {
    club {
      name
      ...ClubThumbnailFragment
    }
  }
`

interface Props {
  query: PostHeaderClubFragment$key
}

export default function PostHeaderClub ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Flex align='center'>
      <ClubThumbnail
        h={8}
        w={8}
        mr={3}
        query={data.club}
      />
      <Heading color='gray.00' fontSize='xl'>
        {data?.club?.name}
      </Heading>
    </Flex>
  )
}
