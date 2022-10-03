import type { GridTopNewPostsFragment$key } from '@//:artifacts/GridTopNewPostsFragment.graphql'
import { graphql } from 'react-relay'
import { GridItem, Stack } from '@chakra-ui/react'
import GridLayoutHome from '../../components/GridsHome/GridLayoutHome/GridLayoutHome'
import { useFragment } from 'react-relay/hooks'
import PreviewPostTileHome from '../PreviewPostTileHome/PreviewPostTileHome'
import StaticTile from '../../components/Tiles/StaticTile/StaticTile'
import { FurryFox, HentaiSkirt, ThreeDRender } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import React from 'react'

interface Props {
  rootQuery: GridTopNewPostsFragment$key
}

const RootFragment = graphql`
  fragment GridTopNewPostsFragment on Query {
    trendingPosts: posts(first: 9, sortBy: ALGORITHM, seed: $seed) {
      __typename
      edges {
        node {
          ...PreviewPostTileHomeFragment
        }
      }
    }
    newPosts: posts(first: 8, sortBy: NEW) {
      __typename
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

  const fallbackPost = data.trendingPosts.edges?.[data.trendingPosts.edges.length - 1].node ?? data.newPosts.edges?.[data.newPosts.edges.length - 1].node ?? null

  const allPosts = [...data.newPosts?.edges, ...data.trendingPosts.edges]

  return (
    <Stack overflowX='scroll' spacing={1}>
      <GridLayoutHome columns={6} rows={2}>
        <GridItem>
          <PreviewPostTileHome badge='trending' postQuery={allPosts?.[8]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='new' postQuery={allPosts?.[0]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem colSpan={2}>
          <PreviewPostTileHome badge='trending' postQuery={allPosts?.[9]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='trending' postQuery={allPosts?.[10]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='new' postQuery={allPosts?.[1]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem colSpan={2}>
          <PreviewPostTileHome badge='new' postQuery={allPosts?.[2]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='new' postQuery={allPosts?.[3]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='new' postQuery={allPosts?.[4]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem colSpan={2}>
          <PreviewPostTileHome badge='trending' postQuery={allPosts?.[11]?.node ?? fallbackPost} />
        </GridItem>
      </GridLayoutHome>
      <GridLayoutHome columns={6} rows={2}>
        <GridItem>
          <PreviewPostTileHome badge='new' postQuery={allPosts?.[5]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='trending' postQuery={allPosts?.[12]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem colSpan={2}>
          <StaticTile
            icon={ThreeDRender}
            href='/search/category/3d'
            bg='https://static.dollycdn.net/banners/3d-thumbnail-2.jpeg'
            header={(
              <Trans>
                3D Porn
              </Trans>
            )}
            footer={(
              <Trans>
                3D renders and animations pornography
              </Trans>
            )}
          />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='trending' postQuery={allPosts?.[13]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='trending' postQuery={allPosts?.[14]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='new' postQuery={allPosts?.[6]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <StaticTile
            icon={HentaiSkirt}
            href='/search/category/hentai'
            bg='https://static.dollycdn.net/banners/hentai-thumbnail.jpeg'
            header={(
              <Trans>
                Hentai Porn
              </Trans>
            )}
            footer={(
              <Trans>
                Japanese-style pornography
              </Trans>
            )}
          />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='trending' postQuery={allPosts?.[15]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <StaticTile
            icon={FurryFox}
            bg='https://static.dollycdn.net/banners/furry-thumbnail-2.jpg'
            href='/search/category/furry'
            header={(
              <Trans>
                Furry Porn
              </Trans>
            )}
            footer={(
              <Trans>
                Anthro and furry character pornography
              </Trans>
            )}
          />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='new' postQuery={allPosts?.[7]?.node ?? fallbackPost} />
        </GridItem>
        <GridItem>
          <PreviewPostTileHome badge='trending' postQuery={allPosts?.[16]?.node ?? fallbackPost} />
        </GridItem>
      </GridLayoutHome>
    </Stack>
  )
}
