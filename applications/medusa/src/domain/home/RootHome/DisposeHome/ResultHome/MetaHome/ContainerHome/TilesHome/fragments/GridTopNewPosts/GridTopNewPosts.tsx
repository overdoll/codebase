import type { GridTopNewPostsFragment$key } from '@//:artifacts/GridTopNewPostsFragment.graphql'
import { graphql } from 'react-relay'
import { GridItem } from '@chakra-ui/react'
import GridLayoutHome from '../../components/GridsHome/GridLayoutHome/GridLayoutHome'
import { useFragment } from 'react-relay/hooks'
import PreviewPostTileHome from '../PreviewPostTileHome/PreviewPostTileHome'

interface Props {
  rootQuery: GridTopNewPostsFragment$key
}

const RootFragment = graphql`
  fragment GridTopNewPostsFragment on Query {
    topPosts: posts(first: 4, sortBy: ALGORITHM) {
      edges {
        node {
          ...PreviewPostTileHomeFragment
        }
      }
    }
    newPosts: posts(first: 5, sortBy: NEW) {
      edges {
        node {
          ...PreviewPostTileHomeFragment
        }
      }
    }
  }
`

export default function GridTopNewPosts (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(
    RootFragment,
    rootQuery
  )

  const fallbackTopPost = data.topPosts.edges?.[data.topPosts.edges.length - 1].node ?? null

  const topPostData = [data.topPosts?.edges[0]?.node ?? fallbackTopPost, data.topPosts?.edges[1]?.node ?? fallbackTopPost, data.topPosts?.edges[2]?.node ?? fallbackTopPost, data.topPosts?.edges[3]?.node ?? fallbackTopPost]

  const fallbackNewPost = data.newPosts.edges?.[data.newPosts.edges.length - 1].node ?? null

  const newPostData = [data.newPosts?.edges[0]?.node ?? fallbackNewPost, data.newPosts?.edges[1]?.node ?? fallbackNewPost, data.newPosts?.edges[2]?.node ?? fallbackNewPost, data.newPosts?.edges[3]?.node ?? fallbackNewPost, data.newPosts?.edges[4]?.node ?? fallbackNewPost]

  return (
    <GridLayoutHome columns={6} rows={2}>
      <GridItem>
        <PreviewPostTileHome badge='trending' postQuery={topPostData[0]} />
      </GridItem>
      <GridItem>
        <PreviewPostTileHome badge='new' postQuery={newPostData[0]} />
      </GridItem>
      <GridItem colSpan={2}>
        <PreviewPostTileHome badge='trending' postQuery={topPostData[1]} />
      </GridItem>
      <GridItem>
        <PreviewPostTileHome badge='trending' postQuery={topPostData[2]} />
      </GridItem>
      <GridItem>
        <PreviewPostTileHome badge='new' postQuery={newPostData[1]} />
      </GridItem>
      <GridItem colSpan={2}>
        <PreviewPostTileHome badge='new' postQuery={newPostData[2]} />
      </GridItem>
      <GridItem>
        <PreviewPostTileHome badge='new' postQuery={newPostData[3]} />
      </GridItem>
      <GridItem>
        <PreviewPostTileHome badge='new' postQuery={newPostData[4]} />
      </GridItem>
      <GridItem colSpan={2}>
        <PreviewPostTileHome badge='trending' postQuery={topPostData[3]} />
      </GridItem>
    </GridLayoutHome>
  )
}
