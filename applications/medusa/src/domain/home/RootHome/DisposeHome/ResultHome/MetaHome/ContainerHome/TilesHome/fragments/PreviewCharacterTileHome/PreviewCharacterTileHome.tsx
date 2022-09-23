import { graphql } from 'react-relay'
import type { PreviewCharacterTileHomeFragment$key } from '@//:artifacts/PreviewCharacterTileHomeFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import PreviewCharacter
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewCharacter/PreviewCharacter'
import CharacterLinkTile
  from '@//:modules/content/PageLayout/Display/fragments/Link/CharacterLinkTile/CharacterLinkTile'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

const Fragment = graphql`
  fragment PreviewCharacterTileHomeFragment on Character {
    ...PreviewCharacterFragment
    ...CharacterLinkTileFragment
  }
`

interface Props {
  characterQuery: PreviewCharacterTileHomeFragment$key
}

export default function PreviewCharacterTileHome (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const data = useFragment(Fragment, characterQuery)

  const onClick = (): void => {
    trackFathomEvent('AXC8TOWZ', 1)
  }

  return (
    <CharacterLinkTile onClick={onClick} query={data}>
      <PreviewCharacter characterQuery={data} />
    </CharacterLinkTile>
  )
}
