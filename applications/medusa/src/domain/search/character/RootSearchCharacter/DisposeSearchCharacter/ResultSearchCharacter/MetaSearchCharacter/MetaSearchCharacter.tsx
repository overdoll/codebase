import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaSearchCharacterFragment$key } from '@//:artifacts/MetaSearchCharacterFragment.graphql'
import SearchCharacterRichObject from './SearchCharacterRichObject/SearchCharacterRichObject'
import ContainerSearchCharacter from './ContainerSearchCharacter/ContainerSearchCharacter'

interface Props {
  characterQuery: MetaSearchCharacterFragment$key
}

const CharacterFragment = graphql`
  fragment MetaSearchCharacterFragment on Character {
    ...SearchCharacterRichObjectFragment
    ...ContainerSearchCharacterFragment
  }
`

export default function MetaSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)

  return (
    <>
      <SearchCharacterRichObject query={characterData} />
      <ContainerSearchCharacter characterQuery={characterData} />
    </>
  )
}
