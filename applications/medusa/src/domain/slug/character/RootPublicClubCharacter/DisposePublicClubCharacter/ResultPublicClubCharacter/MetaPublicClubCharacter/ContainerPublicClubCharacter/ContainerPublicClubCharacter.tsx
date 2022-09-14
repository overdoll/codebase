import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerPublicClubCharacterFragment$key } from '@//:artifacts/ContainerPublicClubCharacterFragment.graphql'
import {
  ContainerPublicClubCharacterViewerFragment$key
} from '@//:artifacts/ContainerPublicClubCharacterViewerFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderPublicClubCharacter from './HeaderPublicClubCharacter/HeaderPublicClubCharacter'
import ScrollPublicClubCharacter from './ScrollPublicClubCharacter/ScrollPublicClubCharacter'

interface Props {
  characterQuery: ContainerPublicClubCharacterFragment$key
  viewerQuery: ContainerPublicClubCharacterViewerFragment$key | null
}

const CharacterFragment = graphql`
  fragment ContainerPublicClubCharacterFragment on Character {
    ...HeaderPublicClubCharacterFragment
    ...ScrollPublicClubCharacterFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerPublicClubCharacterViewerFragment on Account {
    ...ScrollPublicClubCharacterViewerFragment
  }
`

export default function ContainerPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    viewerQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <MobileContainer pt={2}>
        <HeaderPublicClubCharacter characterQuery={characterData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollPublicClubCharacter characterQuery={characterData} viewerQuery={viewerData} />
      </ContentContainer>
    </>
  )
}
