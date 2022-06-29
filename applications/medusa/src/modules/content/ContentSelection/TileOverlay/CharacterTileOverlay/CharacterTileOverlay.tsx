import { Stack, Text } from '@chakra-ui/react'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import { CharacterTileOverlayFragment$key } from '@//:artifacts/CharacterTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'

interface Props {
  query: CharacterTileOverlayFragment$key
}

const Fragment = graphql`
  fragment CharacterTileOverlayFragment on Character {
    id
    name
    series {
      title
    }
    thumbnail {
      ...ResourceItemFragment
    }

  }
`

export default function CharacterTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay backdrop={
      <ResourceItem
        seed={data.id}
        query={data.thumbnail}
      />
    }
    >
      <Stack px={1} py={2} w='100%' h='100%' align='center' justify='center' spacing={0}>
        <Text
          fontSize={{
            base: 'sm',
            md: 'lg'
          }}
          color='gray.00'
          textAlign='center'
          noOfLines={2}
        >
          {data.name}
        </Text>
        <Text
          textAlign='center'
          fontSize={{
            base: '2xs',
            md: 'sm'
          }}
          color='gray.100'
          noOfLines={2}
        >
          {data.series.title}
        </Text>
      </Stack>
    </TileOverlay>
  )
}
