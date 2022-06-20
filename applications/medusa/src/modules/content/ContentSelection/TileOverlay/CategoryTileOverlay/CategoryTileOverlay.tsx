import { Stack, Text } from '@chakra-ui/react'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import { CategoryTileOverlayFragment$key } from '@//:artifacts/CategoryTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'

interface Props {
  query: CategoryTileOverlayFragment$key
}

const Fragment = graphql`
  fragment CategoryTileOverlayFragment on Category {
    id
    title
    thumbnail {
      ...ResourceItemFragment
    }
  }
`

export default function CategoryTileOverlay ({
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
