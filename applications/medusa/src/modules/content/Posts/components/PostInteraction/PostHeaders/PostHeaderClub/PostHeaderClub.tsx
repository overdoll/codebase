import { Heading, HStack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderClubFragment$key } from '@//:artifacts/PostHeaderClubFragment.graphql'
import ClubIcon from '../../../../../PageLayout/Display/fragments/ClubIcon/ClubIcon'

const Fragment = graphql`
  fragment PostHeaderClubFragment on Post {
    club {
      name
      ...ClubIconFragment
    }
  }
`

interface Props {
  query: PostHeaderClubFragment$key
}

export default function PostHeaderClub ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <HStack spacing={2} align='center'>
      <ClubIcon clubQuery={data.club} />
      <Heading color='gray.00' fontSize='xl'>
        {data?.club?.name}
      </Heading>
    </HStack>
  )
}
