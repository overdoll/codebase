import { useFragment } from 'react-relay/hooks'
import type { LargeClubHeaderFragment$key } from '@//:artifacts/LargeClubHeaderFragment.graphql'
import { graphql } from 'react-relay'
import { Flex, Heading } from '@chakra-ui/react'
import ClubThumbnail from '@//:modules/content/DataDisplay/Club/ClubThumbnail/ClubThumbnail'

interface Props {
  query: LargeClubHeaderFragment$key
}

const Fragment = graphql`
  fragment LargeClubHeaderFragment on Club {
    name
    ...ClubThumbnailFragment
  }
`

export default function LargeClubHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Flex h={16} align='center'>
      <ClubThumbnail
        mr={4}
        h={14}
        w={14}
        query={data}
      />
      <Heading
        noOfLines={1}
        fontSize='3xl'
        color='gray.00'
      >
        {data?.name}
      </Heading>
    </Flex>
  )
}
