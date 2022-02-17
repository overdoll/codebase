import { Text } from '@chakra-ui/react'
import ResourceItem from '../../../../DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import { AudienceTileOverlayFragment$key } from '@//:artifacts/AudienceTileOverlayFragment.graphql'
import { TileOverlay } from '../../../index'

interface Props {
  query: AudienceTileOverlayFragment$key
}

const Fragment = graphql`
  fragment AudienceTileOverlayFragment on Audience {
    title
    thumbnail {
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
      maxH={58}
      backdrop={
        <ResourceItem
          query={data.thumbnail}
        />
    }
    >
      <Text
        fontSize='lg'
        color='gray.00'
        textAlign='center'
      >
        {data.title}
      </Text>
    </TileOverlay>
  )
}
