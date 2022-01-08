import { useFragment } from 'react-relay/hooks'
import type { LargeClubHeaderFragment$key } from '@//:artifacts/LargeClubHeaderFragment.graphql'
import { graphql } from 'react-relay'
import { Flex, Text } from '@chakra-ui/react'
import { ResourceIcon } from '@//:modules/content/PageLayout'

interface Props {
  query: LargeClubHeaderFragment$key | null
}

const Fragment = graphql`
  fragment LargeClubHeaderFragment on Club {
    name
    thumbnail {
      ...ResourceIconFragment
    }
  }
`

export default function LargeClubHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Flex align='center'>
      <ResourceIcon mr={8} h={20} w={20} query={data?.thumbnail} />
      <Text fontWeight='bold' fontSize='5xl' color='gray.00'>
        {data?.name}
      </Text>
    </Flex>
  )
}
