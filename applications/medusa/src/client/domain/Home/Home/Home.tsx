import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { useWindowSize } from 'usehooks-ts'
import { useCallback, useEffect, useRef } from 'react'
import { useVirtual } from 'react-virtual'
import HomePost from './HomePost/HomePost'
import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import { GlobalVideoManagerProvider, PostVideoManagerProvider } from '@//:modules/content/Posts'
import { ObserverManagerProvider } from '@//:modules/content/Posts/helpers/ObserverManager/ObserverManager'

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
    first: {type: Int, defaultValue: 10}
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
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<HomeQuery, any>(
    Fragment,
    queryData
  )

  const listRef = useRef(null)

  const {
    height,
    width
  } = useWindowSize()

  const posts = data.posts.edges

  const virtual = useVirtual({
    size: hasNext ? posts.length as number + 1 : posts.length,
    parentRef: listRef,
    estimateSize: useCallback(() => 900, []),
    paddingStart: 20,
    paddingEnd: 20
  })

  useEffect(() => {
    const [lastItem] = [...virtual.virtualItems].reverse()

    if (lastItem == null) {
      return
    }

    if (
      lastItem.index >= posts.length - 1 &&
      hasNext &&
      !isLoadingNext
    ) {
      loadNext(10)
    }
  }, [
    hasNext,
    loadNext,
    posts.length,
    isLoadingNext,
    virtual.virtualItems
  ])

  return (
    <GlobalVideoManagerProvider>
      <Box
        ref={listRef}
        height={height - 54}
        width={width}
        overflowY='auto'
        overflowX='hidden'
      >
        <Box
          height={`${virtual.totalSize}px`}
          width='100%'
          position='relative'
        >
          {virtual.virtualItems.map(virtualRow => {
            const isVirtualRow = virtualRow.index > posts.length - 1
            return (
              <Box
                key={virtualRow.index}
                ref={virtualRow.measureRef}
                position='absolute'
                top={0}
                left={0}
                width='100%'
                transform={`translateY(${virtualRow.start}px)`}
              >
                <Center>
                  <Box
                    pl={[1, 0]}
                    pr={[1, 0]}
                    w={['full', 'lg']}
                    my={4}
                  >
                    <ObserverManagerProvider>
                      <PostVideoManagerProvider>
                        {isVirtualRow
                          ? hasNext
                            ? <Flex w='100%' align='center' justify='center'>
                              <Spinner />
                              </Flex>
                            : <></>
                          : <HomePost query={posts[virtualRow.index].node} viewerQuery={queryData.viewer} />}
                      </PostVideoManagerProvider>
                    </ObserverManagerProvider>
                  </Box>
                </Center>
              </Box>
            )
          }
          )}
        </Box>
      </Box>
    </GlobalVideoManagerProvider>
  )
}
