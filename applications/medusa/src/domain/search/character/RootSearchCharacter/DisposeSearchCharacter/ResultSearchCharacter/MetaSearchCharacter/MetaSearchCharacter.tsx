import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaSearchCharacterFragment$key } from '@//:artifacts/MetaSearchCharacterFragment.graphql'
import { MetaSearchCharacterAccountFragment$key } from '@//:artifacts/MetaSearchCharacterAccountFragment.graphql'
import SearchCharacterRichObject from './SearchCharacterRichObject/SearchCharacterRichObject'
import ContainerSearchCharacter from './ContainerSearchCharacter/ContainerSearchCharacter'

interface Props {
  characterQuery: MetaSearchCharacterFragment$key
  accountQuery: MetaSearchCharacterAccountFragment$key | null
}

const CharacterFragment = graphql`
  fragment MetaSearchCharacterFragment on Character {
    ...SearchCharacterRichObjectFragment
    ...ContainerSearchCharacterFragment
  }
`

const AccountFragment = graphql`
  fragment MetaSearchCharacterAccountFragment on Account {
    ...ContainerSearchCharacterAccountFragment
  }
`

export default function MetaSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    accountQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)
  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <>
      <SearchCharacterRichObject query={characterData} />
      <ContainerSearchCharacter accountQuery={accountData} characterQuery={characterData} />
    </>
  )
}
