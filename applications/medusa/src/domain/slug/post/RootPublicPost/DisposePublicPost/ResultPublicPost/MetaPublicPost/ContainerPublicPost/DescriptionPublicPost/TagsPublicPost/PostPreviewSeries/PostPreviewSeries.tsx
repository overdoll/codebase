import { Grid, GridItem, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewSeriesFragment$key } from '@//:artifacts/PostPreviewSeriesFragment.graphql'
import PreviewSeries from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewSeries/PreviewSeries'
import SeriesLinkTile from '@//:modules/content/PageLayout/Display/fragments/Link/SeriesLinkTile/SeriesLinkTile'

interface Props {
  postQuery: PostPreviewSeriesFragment$key
}

const Fragment = graphql`
  fragment PostPreviewSeriesFragment on Post {
    characters {
      id
      series {
        id
        ...SeriesLinkTileFragment
        ...PreviewSeriesFragment
      }
    }
  }
`

export default function PostPreviewSeries (props: Props): JSX.Element {
  const {
    postQuery
  } = props

  const data = useFragment(Fragment, postQuery)

  const filterSeries = data.characters.filter((item) => item.series != null)
  const getSeries = filterSeries.map((item) => item.series)

  const uniqueSeries = [...getSeries.reduce((map, obj) => map.set(obj?.id, obj), new Map()).values()]

  return (
    <Stack w='100%' spacing={1}>
      <Grid
        w='100%'
        gap={1}
        templateColumns={`repeat(${uniqueSeries.length}, minmax(40px, 400px))`}
        templateRows='40px'
      >
        {uniqueSeries.map((item) => (
          <GridItem key={item.id}>
            <SeriesLinkTile query={item}>
              <PreviewSeries seriesQuery={item} />
            </SeriesLinkTile>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  )
}
