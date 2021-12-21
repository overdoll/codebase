import type { ReactNode } from 'react'
import { useLocation } from '@//:modules/routing'
import Redirect from '@//:modules/routing/Redirect'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { SecurityShield, SettingWrench, UserHuman } from '@//:assets/icons/navigation'
import Can from '@//:modules/authorization/Can'
import { Trans } from '@lingui/macro'

interface Props {
  children: ReactNode
}

export default function Settings ({ children }: Props): JSX.Element {
  const location = useLocation()

  return (
    <VerticalNavigation>
      <VerticalNavigation.Content title={
        <Trans>
          Account Settings
        </Trans>
      }
      >
        <VerticalNavigation.Button
          to='/settings/profile'
          title={
            <Trans>
              Profile
            </Trans>
          }
          icon={UserHuman}
        />
        <VerticalNavigation.Button
          to='/settings/security'
          title={
            <Trans>
              Security
            </Trans>
          }
          icon={SecurityShield}
        />
        <Can I='moderate' a='Post'>
          <VerticalNavigation.Button
            to='/settings/moderation'
            title={
              <Trans>
                Moderation
              </Trans>
            }
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
