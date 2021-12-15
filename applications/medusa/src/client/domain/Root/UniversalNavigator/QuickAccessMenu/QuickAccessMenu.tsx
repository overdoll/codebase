import { PreloadedQuery } from 'react-relay/hooks'
import { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { MenuButton } from '@chakra-ui/react'
import { CogDouble, LoginKeys, PageControllerSettings } from '@//:assets/icons/navigation'
import HorizontalNavigationMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationMenu/HorizontalNavigationMenu'
import { useTranslation } from 'react-i18next'
import QuickAccessMenuLogout from './QuickAccessMenuLogout/QuickAccessMenuLogout'
import QuickAccessMenuProfile from './QuickAccessMenuProfile/QuickAccessMenuProfile'
import useAbility from '@//:modules/authorization/useAbility'

interface Props {
  queryRef: PreloadedQuery<RootQuery> | null
}

export default function QuickAccessMenu ({ queryRef }: Props): JSX.Element {
  const [t] = useTranslation('navigation')

  const ability = useAbility()

  const isLoggedIn = ability.can('manage', 'account')

  return (
    <HorizontalNavigationMenu
      button={({
        isOpen,
        onToggle
      }) => (
        <MenuButton
          w={{
            base: '58px',
            md: '42px'
          }}
          onClick={onToggle}
          active={isOpen}
          label={t('nav.menu')}
          icon={PageControllerSettings}
        />
      )}
    >
      {isLoggedIn && (
        <>
          <QuickAccessMenuProfile queryRef={queryRef} />
          <HorizontalNavigationMenu.Button
            to='/settings/profile'
            icon={CogDouble}
            color='green.500'
            label={t('menu.settings')}
          />
          <QuickAccessMenuLogout />
        </>
      )}
      {!isLoggedIn && (
        <HorizontalNavigationMenu.Button
          to='/join'
          icon={LoginKeys}
          color='green.500'
          label={t('menu.join')}
        />
      )}
    </HorizontalNavigationMenu>
  )
}
