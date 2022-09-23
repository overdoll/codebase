import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaPublicClubCharacterFragment$key } from '@//:artifacts/MetaPublicClubCharacterFragment.graphql'
import PublicClubCharacterRichObject from './PublicClubCharacterRichObject/PublicClubCharacterRichObject'
import ContainerPublicClubCharacter from './ContainerPublicClubCharacter/ContainerPublicClubCharacter'

interface Props {
  characterQuery: MetaPublicClubCharacterFragment$key
}

const CharacterFragment = graphql`
  fragment MetaPublicClubCharacterFragment on Character {
    ...PublicClubCharacterRichObjectFragment
    ...ContainerPublicClubCharacterFragment
  }
`

export default function MetaPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)

  return (
    <>
      <PublicClubCharacterRichObject query={characterData} />
      <ContainerPublicClubCharacter characterQuery={characterData} />
    </>
  )
}
