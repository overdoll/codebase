import { graphql } from 'react-relay'
import type { PreviewSeriesTileHomeFragment$key } from '@//:artifacts/PreviewSeriesTileHomeFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import PreviewSeries from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewSeries/PreviewSeries'
import SeriesLinkTile from '@//:modules/content/PageLayout/Display/fragments/Link/SeriesLinkTile/SeriesLinkTile'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

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

  const onClick = (): void => {
    trackFathomEvent('JVOIKHZN', 1)
  }

  return (
    <SeriesLinkTile onClick={onClick} query={data}>
      <PreviewSeries seriesQuery={data} />
    </SeriesLinkTile>
  )
}
