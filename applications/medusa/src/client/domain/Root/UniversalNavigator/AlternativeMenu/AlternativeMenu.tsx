import { CogDouble, LoginKeys, PageControllerSettings } from '@//:assets/icons/navigation'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { useTranslation } from 'react-i18next'
import useAbility from '@//:modules/authorization/useAbility'
import { RenderOnDesktop } from '@//:modules/content/PageLayout'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import { PreloadedQuery } from 'react-relay/hooks'
import { RootQuery } from '@//:artifacts/RootQuery.graphql'
import QuickAccessButtonProfile from './QuickAccessButtonProfile/QuickAccessButtonProfile'
import DropdownMenuButtonProfile from './DropdownMenuButtonProfile/DropdownMenuButtonProfile'
import DropdownMenuButtonLogout from './DropdownMenuButtonLogout/DropdownMenuButtonLogout'

interface Props {
  queryRef: PreloadedQuery<RootQuery>
}

export default function AlternativeMenu ({ queryRef }: Props): JSX.Element {
  const ability = useAbility()

  const isLoggedIn = ability.can('manage', 'account')

  const [t] = useTranslation('navigation')

  return (
    <>
      <RenderOnDesktop>
        {!isLoggedIn && (
          <HorizontalNavigation.Button
            to='/join'
            w='42px'
            icon={LoginKeys}
            label={t('nav.join')}
          />
        )}
        {isLoggedIn && <QuickAccessButtonProfile queryRef={queryRef} />}
      </RenderOnDesktop>
      <HorizontalNavigationDropdownMenu
        label={t('nav.menu')}
        icon={PageControllerSettings}
      >
        {!isLoggedIn && (
          <HorizontalNavigationDropdownMenu.Button
            to='/join'
            icon={LoginKeys}
            color='green.500'
            label={t('menu.join')}
          />
        )}
        {isLoggedIn && (
          <>
            <DropdownMenuButtonProfile queryRef={queryRef} />
            <HorizontalNavigationDropdownMenu.Button
              to='/settings/profile'
              icon={CogDouble}
              color='green.500'
              label={t('menu.settings')}
            />
            <DropdownMenuButtonLogout />
          </>
        )}
      </HorizontalNavigationDropdownMenu>
    </>
  )
}
