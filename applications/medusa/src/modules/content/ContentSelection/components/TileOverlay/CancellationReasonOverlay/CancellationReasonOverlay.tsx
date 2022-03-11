import { Flex, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { CancellationReasonOverlayFragment$key } from '@//:artifacts/CancellationReasonOverlayFragment.graphql'

interface Props {
  query: CancellationReasonOverlayFragment$key
}

const Fragment = graphql`
  fragment CancellationReasonOverlayFragment on CancellationReason {
    title
  }
`

export default function CancellationReasonOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Flex align='center' w='100%' px={4} py={3} h='100%' bg='gray.900' borderRadius='inherit'>
      <Text
        fontSize='md'
        color='gray.00'
      >
        {data.title}
      </Text>
    </Flex>

  )
}
