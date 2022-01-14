import { PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql } from 'react-relay'
import { VideoManagerProvider } from '../../../../modules/content/Posts/helpers/VideoManager/VideoManager'
import { PostManagerProvider } from '../../../../modules/content/Posts/helpers/PostManager/PostManager'
import { HomeFragment$key } from '@//:artifacts/HomeFragment.graphql'
import HomePost from './HomePost/HomePost'
import { Stack } from '@chakra-ui/react'

interface Props {
  query: PreloadedQuery<HomeQuery>
}

const Query = graphql`
  query HomeQuery {
    ...HomeFragment
    viewer {
      ...HomePostViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment HomeFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "HomePostsPaginationQuery" ) {
    posts (first: $first, after: $after)
    @connection (key: "HomePosts_posts") {
      edges {
        node {
          ...HomePostFragment
        }
      }
    }
  }
`

export default function Home (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<HomeQuery>(
    Query,
    props.query
  )

  const data = useFragment<HomeFragment$key>(Fragment, queryData)

  return (
    <VideoManagerProvider>
      <Stack spacing={8}>
        {data.posts.edges.map((item, index) =>
          (<PostManagerProvider key={index}>
            <HomePost query={item.node} viewerQuery={queryData?.viewer} />
          </PostManagerProvider>))}
      </Stack>
    </VideoManagerProvider>
  )
}
