import type {
  GridSeriesCharactersCategoriesFragment$key
} from '@//:artifacts/GridSeriesCharactersCategoriesFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { GridItem } from '@chakra-ui/react'
import GridLayoutHome from '../../components/GridsHome/GridLayoutHome/GridLayoutHome'
import { FurryFox, HentaiSkirt, ThreeDRender } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import React from 'react'
import StaticTile from '../../components/Tiles/StaticTile/StaticTile'
import PreviewCategoryTileHome from '../PreviewCategoryTileHome/PreviewCategoryTileHome'
import PreviewCharacterTileHome from '../PreviewCharacterTileHome/PreviewCharacterTileHome'
import PreviewSeriesTileHome from '../PreviewSeriesTileHome/PreviewSeriesTileHome'

interface Props {
  rootQuery: GridSeriesCharactersCategoriesFragment$key
}

const RootFragment = graphql`
  fragment GridSeriesCharactersCategoriesFragment on Query {
    categories(first: 3, sortBy: POPULAR, excludeEmpty: true) {
      edges {
        node {
          ...PreviewCategoryTileHomeFragment
        }
      }
    }
    characters(first: 3) {
      edges {
        node {
          ...PreviewCharacterTileHomeFragment
        }
      }
    }
    series(first: 2) {
      edges {
        node {
          ...PreviewSeriesTileHomeFragment
        }
      }
    }
  }
`

export default function GridSeriesCharactersCategories (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(
    RootFragment,
    rootQuery
  )

  return (
    <GridLayoutHome columns={6} rows={2}>
      <GridItem>
        <PreviewCategoryTileHome categoryQuery={data.categories.edges[0].node} />
      </GridItem>
      <GridItem>
        <PreviewCharacterTileHome characterQuery={data.characters.edges[0].node} />
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
        <PreviewCategoryTileHome categoryQuery={data.categories.edges[1].node} />
      </GridItem>
      <GridItem>
        <PreviewSeriesTileHome seriesQuery={data.series.edges[0].node} />
      </GridItem>
      <GridItem>
        <PreviewCharacterTileHome characterQuery={data.characters.edges[1].node} />
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
        <PreviewCategoryTileHome categoryQuery={data.categories.edges[2].node} />
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
        <PreviewCharacterTileHome characterQuery={data.characters.edges[2].node} />
      </GridItem>
      <GridItem>
        <PreviewSeriesTileHome seriesQuery={data.series.edges[1].node} />
      </GridItem>
    </GridLayoutHome>
  )
}
