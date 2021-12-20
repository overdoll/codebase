import type { ReactNode } from 'react'
import { useLocation } from '@//:modules/routing'
import Redirect from '@//:modules/routing/Redirect'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { useTranslation } from 'react-i18next'
import { SecurityShield, SettingWrench, UserHuman } from '@//:assets/icons/navigation'
import Can from '@//:modules/authorization/Can'

interface Props {
  children: ReactNode
}

export default function Settings ({ children }: Props): JSX.Element {
  const location = useLocation()

  const [t] = useTranslation('navigation')

  return (
    <VerticalNavigation>
      <VerticalNavigation.Content title={t('sidebar.settings.title')}>
        <VerticalNavigation.Button
          to='/settings/profile'
          title={t('sidebar.settings.profile')}
          icon={UserHuman}
        />
        <VerticalNavigation.Button
          to='/settings/security'
          title={t('sidebar.settings.security')}
          icon={SecurityShield}
        />
        <Can I='moderate' a='Post'>
          <VerticalNavigation.Button
            to='/settings/moderation'
            title={t('sidebar.settings.moderation')}
            icon={SettingWrench}
          />
        </Can>
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {location.pathname === '/settings' ? <Redirect to='/settings/profile' /> : children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
