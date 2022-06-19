import { Stack, Text } from '@chakra-ui/react'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import { SeriesTileOverlayFragment$key } from '@//:artifacts/SeriesTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'

interface Props {
  query: SeriesTileOverlayFragment$key
}

const Fragment = graphql`
  fragment SeriesTileOverlayFragment on Series {
    id
    title
    thumbnail {
      ...ResourceItemFragment
    }

  }
`

export default function SeriesTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay backdrop={(
      <ResourceItem
        query={data.thumbnail}
        seed={data.id}
      />)}
    >
      <Stack w='100%' h='100%' align='center' justify='center' spacing={0}>
        <Text
          fontSize='lg'
          color='gray.00'
          textAlign='center'
          noOfLines={4}
        >
          {data.title}
        </Text>
      </Stack>
    </TileOverlay>
  )
}
