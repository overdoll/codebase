import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerPublicClubCharacterFragment$key } from '@//:artifacts/ContainerPublicClubCharacterFragment.graphql'
import {
  ContainerPublicClubCharacterAccountFragment$key
} from '@//:artifacts/ContainerPublicClubCharacterAccountFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderPublicClubCharacter from './HeaderPublicClubCharacter/HeaderPublicClubCharacter'
import ScrollPublicClubCharacter from './ScrollPublicClubCharacter/ScrollPublicClubCharacter'

interface Props {
  characterQuery: ContainerPublicClubCharacterFragment$key
  accountQuery: ContainerPublicClubCharacterAccountFragment$key | null
}

const CharacterFragment = graphql`
  fragment ContainerPublicClubCharacterFragment on Character {
    ...HeaderPublicClubCharacterFragment
    ...ScrollPublicClubCharacterFragment
  }
`

const AccountFragment = graphql`
  fragment ContainerPublicClubCharacterAccountFragment on Account {
    ...ScrollPublicClubCharacterAccountFragment
  }
`

export default function ContainerPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    accountQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)

  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <>
      <MobileContainer pt={2}>
        <HeaderPublicClubCharacter characterQuery={characterData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollPublicClubCharacter accountQuery={accountData} characterQuery={characterData} />
      </ContentContainer>
    </>
  )
}
