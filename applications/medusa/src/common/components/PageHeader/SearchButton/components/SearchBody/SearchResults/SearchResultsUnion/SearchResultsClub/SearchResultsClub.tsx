import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsClubFragment$key } from '@//:artifacts/SearchResultsClubFragment.graphql'
import { ClubTileOverlay, LinkTile } from '@//:modules/content/ContentSelection'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'

interface Props {
  query: SearchResultsClubFragment$key
}

const Fragment = graphql`
  fragment SearchResultsClubFragment on Club {
    slug
    ...ClubTileOverlayFragment
  }
`

export default function SearchResultsClub ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { onClose } = useHistoryDisclosureContext()

  return (
    <LinkTile
      onClick={onClose}
      href={{
        pathname: '/[slug]',
        query: {
          slug: data.slug
        }
      }}
    >
      <ClubTileOverlay query={data} />
    </LinkTile>
  )
}
