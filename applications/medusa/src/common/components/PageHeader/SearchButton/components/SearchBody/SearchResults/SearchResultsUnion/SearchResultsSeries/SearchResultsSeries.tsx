import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsSeriesFragment$key } from '@//:artifacts/SearchResultsSeriesFragment.graphql'
import { LinkTile, SeriesTileOverlay } from '@//:modules/content/ContentSelection'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'

interface Props {
  query: SearchResultsSeriesFragment$key
}

const Fragment = graphql`
  fragment SearchResultsSeriesFragment on Series {
    slug
    ...SeriesTileOverlayFragment
  }
`

export default function SearchResultsSeries ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { onClose } = useHistoryDisclosureContext()

  return (
    <LinkTile
      onClick={onClose}
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
