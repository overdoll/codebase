import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsCharacterFragment$key } from '@//:artifacts/SearchResultsCharacterFragment.graphql'
import { CharacterTileOverlay, LinkTile } from '@//:modules/content/ContentSelection'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'

interface Props {
  query: SearchResultsCharacterFragment$key
}

const Fragment = graphql`
  fragment SearchResultsCharacterFragment on Character {
    slug
    series {
      slug
    }
    ...CharacterTileOverlayFragment
  }
`

export default function SearchResultsCharacter ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { onClose } = useHistoryDisclosureContext()

  return (
    <LinkTile
      onClick={onClose}
      href={{
        pathname: '/search/series/[seriesSlug]/[characterSlug]',
        query: {
          seriesSlug: data.series?.slug,
          characterSlug: data.slug
        }
      }}
    >
      <CharacterTileOverlay query={data} />
    </LinkTile>
  )
}
