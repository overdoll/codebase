import { MenuPublicClubFragment$key } from '@//:artifacts/MenuPublicClubFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Menu, MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import Can from '@//:modules/authorization/Can'
import { LoginKeys, NavigationMenuHorizontal, SettingCog } from '@//:assets/icons'
import { t } from '@lingui/macro'
import ClubFooterManageSubscriptionButton from './ClubFooterManageSubscriptionButton/ClubFooterManageSubscriptionButton'
import { useLingui } from '@lingui/react'
import { Icon } from '@//:modules/content/PageLayout'
import useAbility from '@//:modules/authorization/useAbility'

interface Props {
  clubQuery: MenuPublicClubFragment$key
}

const ClubFragment = graphql`
  fragment MenuPublicClubFragment on Club {
    slug
    viewerIsOwner
    viewerMember {
      isSupporter
    }
    ...ClubFooterManageSubscriptionButtonFragment
  }
`

export default function MenuPublicClub (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const { i18n } = useLingui()

  const clubData = useFragment(ClubFragment, clubQuery)

  const ability = useAbility()

  if (!clubData.viewerIsOwner && clubData.viewerMember?.isSupporter !== true && !ability.can('staff', 'Club')) {
    return <></>
  }

  return (
    <Menu
      variant='ghost'
      icon={
        <Icon
          icon={NavigationMenuHorizontal}
          w={6}
          h={6}
          fill='whiteAlpha.800'
        />
      }
      size='md'
    >
      <Can I='staff' a='Club'>
        <MenuLinkItem
          text={i18n._(t`Staff`)}
          icon={LoginKeys}
          href={{
            pathname: '/staff/club/[slug]',
            query: { slug: clubData.slug }
          }}
        />
      </Can>
      {clubData.viewerIsOwner && (
        <MenuLinkItem
          text={i18n._(t`Manage Club`)}
          icon={SettingCog}
          href={{
            pathname: '/club/[slug]/home',
            query: { slug: clubData.slug }
          }}
        />
      )}
      <ClubFooterManageSubscriptionButton query={clubData} />
    </Menu>
  )
}
