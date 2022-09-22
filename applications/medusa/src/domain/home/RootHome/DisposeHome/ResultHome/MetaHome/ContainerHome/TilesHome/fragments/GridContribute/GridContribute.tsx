import { GridItem } from '@chakra-ui/react'
import GridLayoutHome from '../../components/GridsHome/GridLayoutHome/GridLayoutHome'
import { FreshLeaf } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import React from 'react'
import StaticTile from '../../components/Tiles/StaticTile/StaticTile'

export default function GridContribute (): JSX.Element {
  return (
    <GridLayoutHome columns={3} rows={2}>
      <GridItem colSpan={2}>
        <GridItem gridColumn='auto / span 2'>
          <StaticTile
            icon={FreshLeaf}
            bg='https://static.dollycdn.net/banners/new-thumbnail-2.jpg'
            href='/join'
            header={(
              <Trans>
                Create account
              </Trans>
            )}
            footer={(
              <Trans>
                See fresh content
              </Trans>
            )}
          />
        </GridItem>
      </GridItem>
      <GridItem colSpan={1}>
        <GridItem gridColumn='auto / span 2'>
          <StaticTile
            icon={FreshLeaf}
            bg='https://static.dollycdn.net/banners/new-thumbnail-2.jpg'
            href='/artists'
            header={(
              <Trans>
                Post your content
              </Trans>
            )}
            footer={(
              <Trans>
                See fresh content
              </Trans>
            )}
          />
        </GridItem>
      </GridItem>
      <GridItem colSpan={1}>
        <GridItem gridColumn='auto / span 2'>
          <StaticTile
            icon={FreshLeaf}
            bg='https://static.dollycdn.net/banners/new-thumbnail-2.jpg'
            href='/new'
            header={(
              <Trans>
                Join discord
              </Trans>
            )}
            footer={(
              <Trans>
                See fresh content
              </Trans>
            )}
          />
        </GridItem>
      </GridItem>
      <GridItem colSpan={1}>
        <GridItem gridColumn='auto / span 2'>
          <StaticTile
            icon={FreshLeaf}
            bg='https://static.dollycdn.net/banners/new-thumbnail-2.jpg'
            href='/new'
            header={(
              <Trans>
                Follow twitter
              </Trans>
            )}
            footer={(
              <Trans>
                See fresh content
              </Trans>
            )}
          />
        </GridItem>
      </GridItem>
      <GridItem colSpan={1}>
        <GridItem gridColumn='auto / span 2'>
          <StaticTile
            icon={FreshLeaf}
            bg='https://static.dollycdn.net/banners/new-thumbnail-2.jpg'
            href='/new'
            header={(
              <Trans>
                Give feedback
              </Trans>
            )}
            footer={(
              <Trans>
                See fresh content
              </Trans>
            )}
          />
        </GridItem>
      </GridItem>
    </GridLayoutHome>
  )
}
