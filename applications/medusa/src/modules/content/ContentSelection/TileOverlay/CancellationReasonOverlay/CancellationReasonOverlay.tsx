import { Flex, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { CancellationReasonOverlayFragment$key } from '@//:artifacts/CancellationReasonOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import RandomPattern from '../../../PageLayout/Display/components/RandomPattern/RandomPattern'

interface Props {
  query: CancellationReasonOverlayFragment$key
}

const Fragment = graphql`
  fragment CancellationReasonOverlayFragment on CancellationReason {
    id
    title
  }
`

export default function CancellationReasonOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay
      backdrop={
        <RandomPattern seed={data.id} />
      }
    >
      <Flex align='center' w='100%' px={4} py={3} h='100%'>
        <Text
          fontSize='md'
          color='gray.00'
          noOfLines={2}
        >
          {data.title}
        </Text>
      </Flex>
    </TileOverlay>
  )
}
