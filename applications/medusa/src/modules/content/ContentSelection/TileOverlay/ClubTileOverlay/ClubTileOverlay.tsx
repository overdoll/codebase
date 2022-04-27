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
    posts(first: 1) {
      edges {
        node {
          content {
            resource {
              ...ResourceItemFragment
            }
          }
        }
      }
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
        <ResourceItem seed={data.id} h='100%' query={data.posts?.edges[0]?.node?.content[0].resource} />
      }
    >
      <Stack w='100%' spacing={4} h='100%' align='center' justify='center'>
        <Stack w='100%' align='center' justify='center' spacing={2}>
          <ResourceIcon seed={data.id} h={12} w={12} query={data.thumbnail} />
          <Heading textAlign='center' color='gray.00' fontSize='md'>
            {data.name}
          </Heading>
        </Stack>
      </Stack>
    </TileOverlay>
  )
}
