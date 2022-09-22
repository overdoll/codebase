import { graphql, useFragment } from 'react-relay/hooks'
import { PreviewSeriesFragment$key } from '@//:artifacts/PreviewSeriesFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { TileOverlay } from '../../../../../ContentSelection'
import SeriesSmallBanner
  from '../../../../../PageLayout/Display/fragments/SmallBanner/SeriesSmallBanner/SeriesSmallBanner'

interface Props {
  seriesQuery: PreviewSeriesFragment$key
}

const Fragment = graphql`
  fragment PreviewSeriesFragment on Series {
    title
    ...SeriesSmallBannerFragment
  }
`

export default function PreviewSeries (props: Props): JSX.Element {
  const { seriesQuery } = props

  const data = useFragment(Fragment, seriesQuery)

  return (
    <TileOverlay
      backdrop={<SeriesSmallBanner seriesQuery={data} />}
    >
      <Stack overflow='hidden' px={2} align='center' justify='center' h='100%'>
        <Heading
          fontSize={{
            base: '2xs',
            md: 'xs'
          }}
          wordBreak='break-all'
          color='whiteAlpha.800'
          textAlign='center'
        >
          {data.title}
        </Heading>
      </Stack>
    </TileOverlay>
  )
}
