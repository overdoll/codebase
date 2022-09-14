import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaSearchCharacterFragment$key } from '@//:artifacts/MetaSearchCharacterFragment.graphql'
import { MetaSearchCharacterViewerFragment$key } from '@//:artifacts/MetaSearchCharacterViewerFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import SearchCharacterRichObject from './SearchCharacterRichObject/SearchCharacterRichObject'
import ContainerSearchCharacter from './ContainerSearchCharacter/ContainerSearchCharacter'

interface Props {
  characterQuery: MetaSearchCharacterFragment$key
  viewerQuery: MetaSearchCharacterViewerFragment$key | null
}

const CharacterFragment = graphql`
  fragment MetaSearchCharacterFragment on Character {
    ...SearchCharacterRichObjectFragment
    ...ContainerSearchCharacterFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaSearchCharacterViewerFragment on Account {
    ...ContainerSearchCharacterViewerFragment
  }
`

export default function MetaSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    viewerQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <SearchCharacterRichObject query={characterData} />
      <GlobalVideoManagerProvider>
        <ContainerSearchCharacter characterQuery={characterData} viewerQuery={viewerData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
