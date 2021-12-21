import { CogDouble, ContentPens, LoginKeys, PageControllerSettings } from '@//:assets/icons/navigation'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { RenderOnDesktop } from '@//:modules/content/PageLayout'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import { graphql, useFragment } from 'react-relay/hooks'
import QuickAccessButtonProfile from './QuickAccessButtonProfile/QuickAccessButtonProfile'
import DropdownMenuButtonProfile from './DropdownMenuButtonProfile/DropdownMenuButtonProfile'
import DropdownMenuButtonLogout from './DropdownMenuButtonLogout/DropdownMenuButtonLogout'
import Can from '@//:modules/authorization/Can'
import { AlternativeMenuFragment, AlternativeMenuFragment$key } from '@//:artifacts/AlternativeMenuFragment.graphql'
import LanguageManager from './LanguageManager/LanguageManager'
import { MenuDivider, Skeleton } from '@chakra-ui/react'
import { Suspense } from 'react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'

interface Props {
  queryRef: AlternativeMenuFragment$key | null
}

const AlternativeMenuGQL = graphql`
  fragment AlternativeMenuFragment on Account {
    ...DropdownMenuButtonProfileFragment
    ...QuickAccessButtonProfileFragment
  }
`

export default function AlternativeMenu ({ queryRef }: Props): JSX.Element {
  const data = useFragment(AlternativeMenuGQL, queryRef)

  const { i18n } = useLingui()

  return (
    <>
      <RenderOnDesktop>
        <Can not I='manage' a='Account'>
          <HorizontalNavigation.Button
            to='/join'
            w='42px'
            icon={LoginKeys}
            label={
              <Trans>
                Join
              </Trans>
            }
          />
        </Can>
        <Can I='manage' a='Account'>
          <QuickAccessButtonProfile queryRef={data as AlternativeMenuFragment} />
        </Can>
      </RenderOnDesktop>
      <HorizontalNavigationDropdownMenu
        label={i18n._(t`Alternative Menu`)}
        icon={PageControllerSettings}
      >
        <Can not I='manage' a='Account'>
          <HorizontalNavigationDropdownMenu.Button
            to='/join'
            icon={LoginKeys}
            color='green.500'
            label={
              <Trans>
                Join
              </Trans>
            }
          />
        </Can>
        <Can I='manage' a='Account'>
          <DropdownMenuButtonProfile queryRef={data as AlternativeMenuFragment} />
          <HorizontalNavigationDropdownMenu.Button
            to='/manage/my_posts'
            icon={ContentPens}
            label={
              <Trans>
                Manage
              </Trans>
            }
          />
          <HorizontalNavigationDropdownMenu.Button
            to='/settings/profile'
            icon={CogDouble}
            color='green.500'
            label={
              <Trans>
                Settings
              </Trans>
            }
          />
          <DropdownMenuButtonLogout />
        </Can>
        <MenuDivider />
        <Suspense fallback={
          <Skeleton
            borderRadius={5}
            h={12}
          />
        }
        >
          <LanguageManager />
        </Suspense>
      </HorizontalNavigationDropdownMenu>
    </>
  )
}
