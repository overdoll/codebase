import { GridItem } from '@chakra-ui/react'
import GridLayoutHome from '../../components/GridsHome/GridLayoutHome/GridLayoutHome'
import { ArchiveFolder, FreshLeaf, HotContent } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import React from 'react'
import StaticTile from '../../components/Tiles/StaticTile/StaticTile'

export default function GridArchives (): JSX.Element {
  return (
    <GridLayoutHome columns={3} rows={3}>
      <GridItem gridColumn='auto / span 3'>
        <StaticTile
          icon={ArchiveFolder}
          bg='https://static.dollycdn.net/banners/generalbutch-thumbnail.jpg'
          href='/generalbutch'
          header={(
            <Trans>
              GeneralButch Archive
            </Trans>
          )}
          footer={(
            <Trans>
              GeneralButch's content archive
            </Trans>
          )}
        />
      </GridItem>
      <GridItem gridColumn='auto / span 3'>
        <StaticTile
          icon={ArchiveFolder}
          bg='https://static.dollycdn.net/banners/arhoangel-thumbnail.jpg'
          href='/arhoangel'
          header={(
            <Trans>
              ArhoAngel Archive
            </Trans>
          )}
          footer={(
            <Trans>
              ArhoAngel's content archive
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
