import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { useWindowSize } from 'usehooks-ts'
import { useRef } from 'react'
import { useVirtual } from 'react-virtual'
import HomePost from './HomePost/HomePost'

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
          id
          ...HomePostFragment
          ...PostGalleryContentFragment
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
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<HomeQuery, any>(
    Fragment,
    queryData
  )

  const {
    height,
    width
  } = useWindowSize()

  const listRef = useRef(null)

  const posts = data.posts.edges

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNext ? posts.length as number : posts.length

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isLoadingNext
    ? () => {
      }
    : () => loadNext(5)

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index): boolean => !hasNext || index < posts.length

  const getItemSize = (index): number => {
    return 500
  }

  const virtual = useVirtual({
    size: posts.length,
    parentRef: listRef
  })

  console.log('re-render')

  return (
    <div
      ref={listRef}
      style={{
        height: (height - 54),
        width: width,
        overflow: 'auto'
      }}
    >
      <div
        style={{
          height: `${virtual.totalSize}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {virtual.virtualItems.map(virtualRow => (
          <div
            key={virtualRow.index}
            ref={virtualRow.measureRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            <HomePost query={posts[virtualRow.index].node} viewerQuery={queryData.viewer} />
          </div>
        ))}
      </div>
    </div>

  )
}
