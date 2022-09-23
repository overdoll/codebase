import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchCharacterFragment$key } from '@//:artifacts/ContainerSearchCharacterFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderSearchCharacter from './HeaderSearchCharacter/HeaderSearchCharacter'
import ScrollSearchCharacter from './ScrollSearchCharacter/ScrollSearchCharacter'

interface Props {
  characterQuery: ContainerSearchCharacterFragment$key
}

const CharacterFragment = graphql`
  fragment ContainerSearchCharacterFragment on Character {
    ...HeaderSearchCharacterFragment
    ...ScrollSearchCharacterFragment
  }
`

export default function ContainerSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)

  return (
    <>
      <MobileContainer pt={2}>
        <HeaderSearchCharacter characterQuery={characterData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollSearchCharacter characterQuery={characterData} />
      </ContentContainer>
    </>
  )
}
