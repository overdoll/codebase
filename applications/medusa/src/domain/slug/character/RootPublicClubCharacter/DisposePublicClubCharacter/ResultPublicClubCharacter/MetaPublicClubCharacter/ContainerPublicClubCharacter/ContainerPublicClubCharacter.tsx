import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerPublicClubCharacterFragment$key } from '@//:artifacts/ContainerPublicClubCharacterFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderPublicClubCharacter from './HeaderPublicClubCharacter/HeaderPublicClubCharacter'
import ScrollPublicClubCharacter from './ScrollPublicClubCharacter/ScrollPublicClubCharacter'

interface Props {
  characterQuery: ContainerPublicClubCharacterFragment$key
}

const CharacterFragment = graphql`
  fragment ContainerPublicClubCharacterFragment on Character {
    ...HeaderPublicClubCharacterFragment
    ...ScrollPublicClubCharacterFragment
  }
`

export default function ContainerPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)

  return (
    <>
      <MobileContainer pt={2}>
        <HeaderPublicClubCharacter characterQuery={characterData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollPublicClubCharacter characterQuery={characterData} />
      </ContentContainer>
    </>
  )
}
