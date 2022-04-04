import { useFragment } from 'react-relay/hooks'
import type { LargeAccountHeaderFragment$key } from '@//:artifacts/LargeAccountHeaderFragment.graphql'
import { graphql } from 'react-relay'
import { Flex, Heading } from '@chakra-ui/react'
import { ResourceIcon } from '@//:modules/content/PageLayout'

interface Props {
  query: LargeAccountHeaderFragment$key
}

const Fragment = graphql`
  fragment LargeAccountHeaderFragment on Account {
    username
    avatar {
      ...ResourceIconFragment
    }
  }
`

export default function LargeAccountHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Flex h={16} align='center'>
      <ResourceIcon mr={4} h={14} w={14} query={data?.avatar} />
      <Heading
        isTruncated
        fontSize='3xl'
        color='gray.00'
      >
        {data?.username}
      </Heading>
    </Flex>
  )
}
