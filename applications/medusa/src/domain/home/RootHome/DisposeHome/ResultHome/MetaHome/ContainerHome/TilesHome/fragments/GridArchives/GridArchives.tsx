import { GridItem } from '@chakra-ui/react'
import GridLayoutHome from '../../components/GridsHome/GridLayoutHome/GridLayoutHome'
import { FreshLeaf, HotContent } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import React from 'react'
import StaticTile from '../../components/Tiles/StaticTile/StaticTile'

export default function GridArchives (): JSX.Element {
  return (
    <GridLayoutHome columns={3} rows={3}>
      <GridItem gridColumn='auto / span 3'>
        <StaticTile
          icon={HotContent}
          bg='https://static.dollycdn.net/banners/top-thumbnail.jpg'
          href='/generalbutch'
          header={(
            <Trans>
              GeneralButch archive
            </Trans>
          )}
          footer={(
            <Trans>
              gb archive
            </Trans>
          )}
        />
      </GridItem>
      <GridItem gridColumn='auto / span 3'>
        <StaticTile
          icon={HotContent}
          bg='https://static.dollycdn.net/banners/top-thumbnail.jpg'
          href='/arhoangel'
          header={(
            <Trans>
              ArhoAngel archive
            </Trans>
          )}
          footer={(
            <Trans>
              gb archive
            </Trans>
          )}
        />
      </GridItem>
      <GridItem gridColumn='auto / span 1'>
        <StaticTile
          icon={HotContent}
          bg='https://static.dollycdn.net/banners/top-thumbnail.jpg'
          href='/top'
          header={(
            <Trans>
              Top Content
            </Trans>
          )}
          footer={(
            <Trans>
              See the best content
            </Trans>
          )}
        />
      </GridItem>
      <GridItem gridColumn='auto / span 2'>
        <StaticTile
          icon={FreshLeaf}
          bg='https://static.dollycdn.net/banners/new-thumbnail-2.jpg'
          href='/new'
          header={(
            <Trans>
              New Content
            </Trans>
          )}
          footer={(
            <Trans>
              See fresh content
            </Trans>
          )}
        />
      </GridItem>
    </GridLayoutHome>
  )
}
