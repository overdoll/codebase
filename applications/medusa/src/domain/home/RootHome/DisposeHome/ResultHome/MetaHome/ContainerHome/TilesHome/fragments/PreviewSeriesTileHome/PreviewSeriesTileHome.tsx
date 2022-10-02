import { graphql } from 'react-relay'
import type { PreviewSeriesTileHomeFragment$key } from '@//:artifacts/PreviewSeriesTileHomeFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import PreviewSeries from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewSeries/PreviewSeries'
import SeriesLinkTile from '@//:modules/content/PageLayout/Display/fragments/Link/SeriesLinkTile/SeriesLinkTile'

const Fragment = graphql`
  fragment PreviewSeriesTileHomeFragment on Series {
    ...PreviewSeriesFragment
    ...SeriesLinkTileFragment
  }
`

interface Props {
  seriesQuery: PreviewSeriesTileHomeFragment$key
}

export default function PreviewSeriesTileHome (props: Props): JSX.Element {
  const {
    seriesQuery
  } = props

  const data = useFragment(Fragment, seriesQuery)

  return (
    <SeriesLinkTile query={data}>
      <PreviewSeries seriesQuery={data} />
    </SeriesLinkTile>
  )
}
