import { Heading, Stack } from '@chakra-ui/react'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import { ClubTileOverlayFragment$key } from '@//:artifacts/ClubTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import { ResourceIcon } from '../../../PageLayout'

interface Props {
  query: ClubTileOverlayFragment$key
}

const Fragment = graphql`
  fragment ClubTileOverlayFragment on Club {
    id
    name
    thumbnail {
      ...ResourceIconFragment
    }
    banner {
      ...ResourceItemFragment
    }
  }
`

export default function ClubTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay
      backdrop={
        <ResourceItem showBorder seed={data.id} h='100%' query={data.banner} />
      }
    >
      <Stack p={2} w='100%' spacing={2} h='100%' align='center' justify='center'>
        <ResourceIcon
          showBorder
          seed={data.id}
          h={{
            base: 8,
            md: 12
          }}
          w={{
            base: 8,
            md: 12
          }}
          query={data.thumbnail}
        />
        <Heading
          textAlign='center'
          color='gray.00'
          noOfLines={3}
          fontSize={{
            base: 'sm',
            md: 'md'
          }}
        >
          {data.name}
        </Heading>
      </Stack>
    </TileOverlay>
  )
}
