import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaBrowseFragment$key } from '@//:artifacts/MetaBrowseFragment.graphql'
import { MetaBrowseViewerFragment$key } from '@//:artifacts/MetaBrowseViewerFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import BrowseRichObject from './BrowseRichObject/BrowseRichObject'
import BrowseStructuredData from './BrowseStructuredData/BrowseStructuredData'
import ContainerBrowse from './ContainerBrowse/ContainerBrowse'

interface Props {
  rootQuery: MetaBrowseFragment$key
  viewerQuery: MetaBrowseViewerFragment$key | null
}

const RootFragment = graphql`
  fragment MetaBrowseFragment on Query {
    ...ContainerBrowseFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaBrowseViewerFragment on Account {
    ...ContainerBrowseViewerFragment
  }
`

export default function MetaBrowse (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <BrowseRichObject />
      <BrowseStructuredData />
      <GlobalVideoManagerProvider>
        <ContainerBrowse rootQuery={rootData} viewerQuery={viewerData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
