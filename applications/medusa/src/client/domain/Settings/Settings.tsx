import type { ReactNode } from 'react'
import { useLocation } from '@//:modules/routing'
import { Redirect } from 'react-router'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { useTranslation } from 'react-i18next'
import { SecurityShield, SettingWrench, UserHuman } from '@//:assets/icons/navigation'
import useAbility from '@//:modules/authorization/useAbility'

interface Props {
  children: ReactNode
}

export default function Settings ({ children }: Props): JSX.Element {
  const location = useLocation()

  const [t] = useTranslation('navigation')

  const ability = useAbility()

  const canAccessPendingPosts = ability.can('manage', 'pendingPosts')

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
        {canAccessPendingPosts && (
          <VerticalNavigation.Button
            to='/settings/moderation'
            title={t('sidebar.settings.moderation')}
            icon={SettingWrench}
          />
        )}
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {location.pathname === '/settings' ? <Redirect to='/settings/profile' /> : children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
