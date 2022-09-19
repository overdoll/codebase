import { useFragment } from 'react-relay/hooks'
import type { LargeAccountHeaderFragment$key } from '@//:artifacts/LargeAccountHeaderFragment.graphql'
import { graphql } from 'react-relay'
import { Heading, HStack } from '@chakra-ui/react'
import AccountIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/AccountIcon/AccountIcon'

interface Props {
  query: LargeAccountHeaderFragment$key
}

const Fragment = graphql`
  fragment LargeAccountHeaderFragment on Account {
    username
    ...AccountIconFragment
  }
`

export default function LargeAccountHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <HStack spacing={4} h={16} align='center'>
      <AccountIcon size='lg' accountQuery={data} />
      <Heading
        noOfLines={1}
        fontSize='3xl'
        color='gray.00'
      >
        {data?.username}
      </Heading>
    </HStack>
  )
}
