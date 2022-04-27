import { useFragment } from 'react-relay/hooks'
import type { LargeClubHeaderFragment$key } from '@//:artifacts/LargeClubHeaderFragment.graphql'
import { graphql } from 'react-relay'
import { Flex, Heading } from '@chakra-ui/react'
import { ResourceIcon } from '@//:modules/content/PageLayout'

interface Props {
  query: LargeClubHeaderFragment$key | null
}

const Fragment = graphql`
  fragment LargeClubHeaderFragment on Club {
    id
    name
    thumbnail {
      ...ResourceIconFragment
    }
  }
`

export default function LargeClubHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Flex h={16} align='center'>
      <ResourceIcon
        seed={data?.id}
        mr={4}
        h={14}
        w={14}
        query={data?.thumbnail}
      />
      <Heading
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        overflow='hidden'
        fontSize='3xl'
        color='gray.00'
      >
        {data?.name}
      </Heading>
    </Flex>
  )
}
