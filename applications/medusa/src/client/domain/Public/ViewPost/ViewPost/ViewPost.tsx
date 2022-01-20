import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewPostQuery } from '@//:artifacts/ViewPostQuery.graphql'
import { graphql } from 'react-relay'
import { useHistory } from '@//:modules/routing'
import FullDetailedPost from './FullDetailedPost/FullDetailedPost'
import { GlobalVideoManagerProvider, PostVideoManagerProvider } from '@//:modules/content/Posts'
import { ObserverManagerProvider } from '@//:modules/content/Posts/helpers/ObserverManager/ObserverManager'

interface Props {
  query: PreloadedQuery<ViewPostQuery>
}

const Query = graphql`
  query ViewPostQuery($reference: String!) {
    post(reference: $reference) {
      ...FullDetailedPostFragment
    }
    viewer {
      ...FullDetailedPostViewerFragment
    }
  }
`

export default function ViewPost (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ViewPostQuery>(
    Query,
    props.query
  )

  const history = useHistory()

  if (queryData?.post == null) {
    history.push('/')
  }

  return (
    <GlobalVideoManagerProvider>
      <ObserverManagerProvider>
        <PostVideoManagerProvider>
          <FullDetailedPost query={queryData?.post} viewerQuery={queryData?.viewer} />
        </PostVideoManagerProvider>
      </ObserverManagerProvider>
    </GlobalVideoManagerProvider>
  )
}
