import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaPublicClubCharacterFragment$key } from '@//:artifacts/MetaPublicClubCharacterFragment.graphql'
import { MetaPublicClubCharacterViewerFragment$key } from '@//:artifacts/MetaPublicClubCharacterViewerFragment.graphql'
import PublicClubCharacterRichObject from './PublicClubCharacterRichObject/PublicClubCharacterRichObject'
import ContainerPublicClubCharacter from './ContainerPublicClubCharacter/ContainerPublicClubCharacter'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'

interface Props {
  characterQuery: MetaPublicClubCharacterFragment$key
  viewerQuery: MetaPublicClubCharacterViewerFragment$key | null
}

const CharacterFragment = graphql`
  fragment MetaPublicClubCharacterFragment on Character {
    ...PublicClubCharacterRichObjectFragment
    ...ContainerPublicClubCharacterFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaPublicClubCharacterViewerFragment on Account {
    ...ContainerPublicClubCharacterViewerFragment
  }
`

export default function MetaPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    viewerQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <PublicClubCharacterRichObject query={characterData} />
      <GlobalVideoManagerProvider>
        <ContainerPublicClubCharacter characterQuery={characterData} viewerQuery={viewerData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
