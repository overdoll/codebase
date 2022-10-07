import { GridItem } from '@chakra-ui/react'
import GridLayoutHome from '../../components/GridsHome/GridLayoutHome/GridLayoutHome'
import { BirdHouse, ContentBookEdit, ContentBrushPen, LoginKeys } from '@//:assets/icons'
import { SocialDiscord, SocialTwitter } from '@//:assets/logos'
import { Trans } from '@lingui/macro'
import React from 'react'
import StaticTile from '../../components/Tiles/StaticTile/StaticTile'
import useAbility from '@//:modules/authorization/useAbility'
import { DISCORD_LINK, TWITTER_FOLLOW_INTENT } from '@//:modules/constants/links'

export default function GridContribute (): JSX.Element {
  const ability = useAbility()

  return (
    <GridLayoutHome columns={3} rows={2}>
      <GridItem colSpan={2}>
        {ability.can('configure', 'Account')
          ? (
            <StaticTile
              color='primary.300'
              icon={BirdHouse}
              href='/settings/preferences'
              header={(
                <Trans>
                  Update Preferences
                </Trans>
              )}
              footer={(
                <Trans>
                  Update your curation profile
                </Trans>
              )}
            />
            )
          : (
            <StaticTile
              href='/join'
              color='primary.300'
              icon={LoginKeys}
              header={(
                <Trans>
                  Join overdoll
                </Trans>
              )}
              footer={(
                <Trans>
                  Join overdoll to curate your content and save posts
                </Trans>
              )}
            />
            )}
      </GridItem>
      <GridItem colSpan={1}>
        <StaticTile
          color='green.300'
          icon={ContentBrushPen}
          href='/artists'
          header={(
            <Trans>
              Post Content
            </Trans>
          )}
          footer={(
            <Trans>
              Post your adult content
            </Trans>
          )}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <StaticTile
          color='facebook.300'
          isExternal
          icon={SocialDiscord}
          href={DISCORD_LINK}
          header={(
            <Trans>
              Join Discord
            </Trans>
          )}
          footer={(
            <Trans>
              Join our community Discord
            </Trans>
          )}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <StaticTile
          color='twitter.300'
          isExternal
          icon={SocialTwitter}
          href={TWITTER_FOLLOW_INTENT}
          header={(
            <Trans>
              Follow Twitter
            </Trans>
          )}
          footer={(
            <Trans>
              Follow us on Twitter
            </Trans>
          )}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <StaticTile
          color='purple.300'
          icon={ContentBookEdit}
          href='/feedback'
          header={(
            <Trans>
              Give Feedback
            </Trans>
          )}
          footer={(
            <Trans>
              Tell us what you really think
            </Trans>
          )}
        />
      </GridItem>
    </GridLayoutHome>
  )
}
