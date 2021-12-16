import { CogDouble, ContentPens, LoginKeys, PageControllerSettings } from '@//:assets/icons/navigation'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { useTranslation } from 'react-i18next'
import { RenderOnDesktop } from '@//:modules/content/PageLayout'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import { PreloadedQuery } from 'react-relay/hooks'
import { RootQuery } from '@//:artifacts/RootQuery.graphql'
import QuickAccessButtonProfile from './QuickAccessButtonProfile/QuickAccessButtonProfile'
import DropdownMenuButtonProfile from './DropdownMenuButtonProfile/DropdownMenuButtonProfile'
import DropdownMenuButtonLogout from './DropdownMenuButtonLogout/DropdownMenuButtonLogout'
import Can from '@//:modules/authorization/Can'

interface Props {
  queryRef: PreloadedQuery<RootQuery>
}

export default function AlternativeMenu ({ queryRef }: Props): JSX.Element {
  const [t] = useTranslation('navigation')

  return (
    <>
      <RenderOnDesktop>
        <Can not I='manage' a='Account'>
          <HorizontalNavigation.Button
            to='/join'
            w='42px'
            icon={LoginKeys}
            label={t('nav.join')}
          />
        </Can>
        <Can I='manage' a='Account'>
          <QuickAccessButtonProfile queryRef={queryRef} />
        </Can>
      </RenderOnDesktop>
      <HorizontalNavigationDropdownMenu
        label={t('nav.menu')}
        icon={PageControllerSettings}
      >
        <Can not I='manage' a='Account'>
          <HorizontalNavigationDropdownMenu.Button
            to='/join'
            icon={LoginKeys}
            color='green.500'
            label={t('menu.join')}
          />
        </Can>
        <Can I='manage' a='Account'>
          <DropdownMenuButtonProfile queryRef={queryRef} />
          <HorizontalNavigationDropdownMenu.Button
            to='/manage/my_posts'
            icon={ContentPens}
            label={t('menu.manage')}
          />
          <HorizontalNavigationDropdownMenu.Button
            to='/settings/profile'
            icon={CogDouble}
            color='green.500'
            label={t('menu.settings')}
          />
          <DropdownMenuButtonLogout />
        </Can>
      </HorizontalNavigationDropdownMenu>
    </>
  )
}
