import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaPublicClubCharacterFragment$key } from '@//:artifacts/MetaPublicClubCharacterFragment.graphql'
import {
  MetaPublicClubCharacterAccountFragment$key
} from '@//:artifacts/MetaPublicClubCharacterAccountFragment.graphql'
import PublicClubCharacterRichObject from './PublicClubCharacterRichObject/PublicClubCharacterRichObject'
import ContainerPublicClubCharacter from './ContainerPublicClubCharacter/ContainerPublicClubCharacter'

interface Props {
  characterQuery: MetaPublicClubCharacterFragment$key
  accountQuery: MetaPublicClubCharacterAccountFragment$key | null
}

const CharacterFragment = graphql`
  fragment MetaPublicClubCharacterFragment on Character {
    ...PublicClubCharacterRichObjectFragment
    ...ContainerPublicClubCharacterFragment
  }
`

const AccountFragment = graphql`
  fragment MetaPublicClubCharacterAccountFragment on Account {
    ...ContainerPublicClubCharacterAccountFragment
  }
`

export default function MetaPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    accountQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)

  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <>
      <PublicClubCharacterRichObject query={characterData} />
      <ContainerPublicClubCharacter accountQuery={accountData} characterQuery={characterData} />
    </>
  )
}
