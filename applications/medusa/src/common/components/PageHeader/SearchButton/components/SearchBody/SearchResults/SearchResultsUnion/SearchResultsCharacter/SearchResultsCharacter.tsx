import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsCharacterFragment$key } from '@//:artifacts/SearchResultsCharacterFragment.graphql'
import { CharacterTileOverlay } from '@//:modules/content/ContentSelection'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'
import CharacterLinkTile from '../../../../../../../../../modules/content/PageLayout/Display/fragments/Link/CharacterLinkTile/CharacterLinkTile'

interface Props {
  query: SearchResultsCharacterFragment$key
}

const Fragment = graphql`
  fragment SearchResultsCharacterFragment on Character {
    ...CharacterTileOverlayFragment
    ...CharacterLinkTileFragment
  }
`

export default function SearchResultsCharacter ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { onClose } = useHistoryDisclosureContext()

  return (
    <CharacterLinkTile onClick={onClose} query={data}>
      <CharacterTileOverlay query={data} />
    </CharacterLinkTile>
  )
}
