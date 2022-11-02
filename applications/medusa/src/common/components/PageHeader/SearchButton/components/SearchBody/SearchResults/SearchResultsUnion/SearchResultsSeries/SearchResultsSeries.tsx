import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsSeriesFragment$key } from '@//:artifacts/SearchResultsSeriesFragment.graphql'
import { LinkTile, SeriesTileOverlay } from '@//:modules/content/ContentSelection'

interface Props {
  query: SearchResultsSeriesFragment$key
  onClick?: () => void
}

const Fragment = graphql`
  fragment SearchResultsSeriesFragment on Series {
    slug
    ...SeriesTileOverlayFragment
  }
`

export default function SearchResultsSeries (props: Props): JSX.Element {
  const {
    query,
    onClick
  } = props

  const data = useFragment(Fragment, query)

  return (
    <LinkTile
      onClick={onClick}
      href={{
        pathname: '/search/series/[seriesSlug]',
        query: {
          seriesSlug: data.slug
        }
      }}
    >
      <SeriesTileOverlay query={data} />
    </LinkTile>
  )
}
