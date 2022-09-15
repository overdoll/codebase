import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaClubsFeedFragment$key } from '@//:artifacts/MetaClubsFeedFragment.graphql'
import { MetaClubsFeedViewerFragment$key } from '@//:artifacts/MetaClubsFeedViewerFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import FeedRichObject from './FeedRichObject/FeedRichObject'
import ContainerClubsFeed from './ContainerClubsFeed/ContainerClubsFeed'

interface Props {
  rootQuery: MetaClubsFeedFragment$key
  viewerQuery: MetaClubsFeedViewerFragment$key | null
}

const RootFragment = graphql`
  fragment MetaClubsFeedFragment on Query {
    ...ContainerClubsFeedFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaClubsFeedViewerFragment on Account {
    ...ContainerClubsFeedViewerFragment
  }
`

export default function MetaClubsFeed (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <FeedRichObject />
      <GlobalVideoManagerProvider>
        <ContainerClubsFeed rootQuery={rootData} viewerQuery={viewerData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
