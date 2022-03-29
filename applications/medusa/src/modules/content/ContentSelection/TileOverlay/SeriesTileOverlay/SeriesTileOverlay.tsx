import { Stack, Text } from '@chakra-ui/react'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'
import { SeriesIdentifier } from '@//:assets/icons/interface'
import { graphql, useFragment } from 'react-relay/hooks'
import { SeriesTileOverlayFragment$key } from '@//:artifacts/SeriesTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import { Icon } from '../../../PageLayout'

interface Props {
  query: SeriesTileOverlayFragment$key
}

const Fragment = graphql`
  fragment SeriesTileOverlayFragment on Series {
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
    <TileOverlay backdrop={<ResourceItem
      query={data.thumbnail}
                           />}
    >
      <Stack spacing={1}>
        <Icon w={4} h={4} icon={SeriesIdentifier} fill='gray.00' />
        <Text
          fontSize='lg'
          color='gray.00'
          textAlign='center'
        >
          {data.title}
        </Text>
      </Stack>
    </TileOverlay>
  )
}
