import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchCharacterFragment$key } from '@//:artifacts/ContainerSearchCharacterFragment.graphql'
import {
  ContainerSearchCharacterViewerFragment$key
} from '@//:artifacts/ContainerSearchCharacterViewerFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderSearchCharacter from './HeaderSearchCharacter/HeaderSearchCharacter'
import ScrollSearchCharacter from './ScrollSearchCharacter/ScrollSearchCharacter'

interface Props {
  characterQuery: ContainerSearchCharacterFragment$key
  viewerQuery: ContainerSearchCharacterViewerFragment$key | null
}

const CharacterFragment = graphql`
  fragment ContainerSearchCharacterFragment on Character {
    ...HeaderSearchCharacterFragment
    ...ScrollSearchCharacterFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerSearchCharacterViewerFragment on Account {
    ...ScrollSearchCharacterViewerFragment
  }
`

export default function ContainerSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    viewerQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <MobileContainer pt={2}>
        <HeaderSearchCharacter characterQuery={characterData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollSearchCharacter characterQuery={characterData} viewerQuery={viewerData} />
      </ContentContainer>
    </>
  )
}
