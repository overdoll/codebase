import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsCharacterFragment$key } from '@//:artifacts/SearchResultsCharacterFragment.graphql'
import { CharacterTileOverlay } from '@//:modules/content/ContentSelection'
import CharacterLinkTile
  from '../../../../../../../../../modules/content/PageLayout/Display/fragments/Link/CharacterLinkTile/CharacterLinkTile'

interface Props {
  query: SearchResultsCharacterFragment$key
  onClick?: () => void
}

const Fragment = graphql`
  fragment SearchResultsCharacterFragment on Character {
    ...CharacterTileOverlayFragment
    ...CharacterLinkTileFragment
  }
`

export default function SearchResultsCharacter (props: Props): JSX.Element {
  const {
    query,
    onClick
  } = props

  const data = useFragment(Fragment, query)

  return (
    <CharacterLinkTile onClick={onClick} query={data}>
      <CharacterTileOverlay query={data} />
    </CharacterLinkTile>
  )
}
