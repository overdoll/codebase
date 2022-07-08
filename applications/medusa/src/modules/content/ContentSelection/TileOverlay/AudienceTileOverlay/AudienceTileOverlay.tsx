import { Flex, Text } from '@chakra-ui/react'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import { AudienceTileOverlayFragment$key } from '@//:artifacts/AudienceTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'

interface Props {
  query: AudienceTileOverlayFragment$key
}

const Fragment = graphql`
  fragment AudienceTileOverlayFragment on Audience {
    id
    title
    banner {
      ...ResourceItemFragment
    }
  }
`

export default function AudienceTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay
      backdrop={
        <ResourceItem
          showBorder
          seed={data.id}
          query={data.banner}
        />
      }
    >
      <Flex py={2} px={4} w='100%' h='100%' align='center' justify='center'>
        <Text
          fontSize='lg'
          color='gray.00'
          textAlign='center'
          noOfLines={4}
        >
          {data.title}
        </Text>
      </Flex>
    </TileOverlay>
  )
}
