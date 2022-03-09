import type { ReactNode } from 'react'
import { useLocation } from '@//:modules/routing'
import Redirect from '@//:modules/routing/Redirect'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { BillingIdentifier, SecurityShield, SettingWrench, UserHuman } from '@//:assets/icons'
import Can from '@//:modules/authorization/Can'
import { Trans } from '@lingui/macro'
import { CategoryIdentifier } from '@//:assets/icons/interface'
import LockedAccountBanner from '../../components/LockedAccount/LockedAccountBanner/LockedAccountBanner'

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
          colorScheme='green'
          title={
            <Trans>
              Profile
            </Trans>
          }
          icon={UserHuman}
        />
        <VerticalNavigation.Button
          to='/settings/security'
          colorScheme='green'
          title={
            <Trans>
              Security
            </Trans>
          }
          icon={SecurityShield}
        />
        <VerticalNavigation.Button
          to='/settings/preferences'
          colorScheme='green'
          title={
            <Trans>
              Preferences
            </Trans>
          }
          icon={CategoryIdentifier}
        />
        <VerticalNavigation.Button
          to='/settings/billing'
          colorScheme='green'
          title={
            <Trans>
              Billing
            </Trans>
          }
          icon={BillingIdentifier}
        />
        <Can I='moderate' a='Post'>
          <VerticalNavigation.Button
            to='/settings/moderation'
            colorScheme='purple'
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
        <LockedAccountBanner />
        {location.pathname === '/settings' ? <Redirect to='/settings/profile' /> : children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
