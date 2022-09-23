import { Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { SeriesTileOverlayFragment$key } from '@//:artifacts/SeriesTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import SeriesBanner from '../../../PageLayout/Display/fragments/Banner/SeriesBanner/SeriesBanner'

interface Props {
  query: SeriesTileOverlayFragment$key
}

const Fragment = graphql`
  fragment SeriesTileOverlayFragment on Series {
    title
    ...SeriesBannerFragment
  }
`

export default function SeriesTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay backdrop={<SeriesBanner seriesQuery={data} />}>
      <Stack p={2} w='100%' h='100%' align='center' justify='center' spacing={0}>
        <Text
          fontSize={{
            base: 'sm',
            md: 'lg'
          }}
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
