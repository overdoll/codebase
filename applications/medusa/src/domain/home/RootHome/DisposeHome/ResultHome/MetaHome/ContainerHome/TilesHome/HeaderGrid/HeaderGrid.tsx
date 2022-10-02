import { GridItem } from '@chakra-ui/react'
import React from 'react'
import GridLayoutHome from '../components/GridsHome/GridLayoutHome/GridLayoutHome'
import RouletteTile from '../components/Tiles/RouletteTile/RouletteTile'
import { DiscoverGlobe, RandomizeDice, SearchBar } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import getRandomSeed from '@//:modules/support/getRandomSeed'
import StaticTile from '../components/Tiles/StaticTile/StaticTile'

export default function HeaderGrid (): JSX.Element {
  const seed = getRandomSeed()

  return (
    <GridLayoutHome columns={3} rows={3}>
      <GridItem colSpan={3} rowSpan={2}>
        <RouletteTile />
      </GridItem>
      <GridItem>
        <StaticTile
          icon={RandomizeDice}
          bg='https://static.dollycdn.net/banners/browse-thumbnail-2.jpg'
          href={`/random?seed=${seed}`}
          header={(
            <Trans>
              Randomize
            </Trans>
          )}
          footer={(
            <Trans>
              Randomly browse hentai, 3d, furry porn
            </Trans>
          )}
        />
      </GridItem>
      <GridItem>
        <StaticTile
          bg='https://static.dollycdn.net/banners/search-thumbnail.jpg'
          icon={SearchBar}
          href='/search'
          header={(
            <Trans>
              Search
            </Trans>
          )}
          footer={(
            <Trans>
              Search for any kind of porn
            </Trans>
          )}
        />
      </GridItem>
      <GridItem>
        <StaticTile
          bg='https://static.dollycdn.net/banners/discover-thumbnail.jpg'
          icon={DiscoverGlobe}
          href='/clubs/discover'
          header={(
            <Trans>
              Discover
            </Trans>
          )}
          footer={(
            <Trans>
              Discover clubs posting content
            </Trans>
          )}
        />
      </GridItem>
    </GridLayoutHome>
  )
}
