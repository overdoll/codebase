import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsClubFragment$key } from '@//:artifacts/SearchResultsClubFragment.graphql'
import { ClubTileOverlay, LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: SearchResultsClubFragment$key
  onClick?: () => void
}

const Fragment = graphql`
  fragment SearchResultsClubFragment on Club {
    slug
    ...ClubTileOverlayFragment
  }
`

export default function SearchResultsClub (props: Props): JSX.Element {
  const {
    query,
    onClick
  } = props

  const data = useFragment(Fragment, query)

  return (
    <LinkTile
      onClick={onClick}
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
