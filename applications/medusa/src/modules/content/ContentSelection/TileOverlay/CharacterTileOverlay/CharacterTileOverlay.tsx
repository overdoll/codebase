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
    club {
      name
    }
    banner {
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
        showBorder
        seed={data.id}
        query={data.banner}
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
          whiteSpace='normal'
          wordBreak='break-word'
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
          whiteSpace='normal'
          wordBreak='break-word'
        >
          {data.series?.title ?? data.club?.name}
        </Text>
      </Stack>
    </TileOverlay>
  )
}
