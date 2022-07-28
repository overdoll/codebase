import type { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { BillingIdentifier, PayoutMethod, SecurityShield, SettingWrench, UserHuman } from '@//:assets/icons'
import Can from '@//:modules/authorization/Can'
import { Trans } from '@lingui/macro'
import { CategoryIdentifier } from '@//:assets/icons/interface'
import SettingsRichObject from '../../../rich-objects/settings/SettingsRichObject/SettingsRichObject'

interface Props {
  children: ReactNode
}

export default function SettingsLayout ({ children }: Props): JSX.Element {
  return (
    <>
      <SettingsRichObject />
      <VerticalNavigation>
        <VerticalNavigation.Content title={
          <Trans>
            Account Settings
          </Trans>
        }
        >
          <VerticalNavigation.Button
            href='/settings/profile'
            colorScheme='green'
            title={
              <Trans>
                Profile
              </Trans>
            }
            icon={UserHuman}
          />
          <VerticalNavigation.Button
            href='/settings/security'
            colorScheme='green'
            title={
              <Trans>
                Security
              </Trans>
            }
            icon={SecurityShield}
          />
          <VerticalNavigation.Button
            href='/settings/preferences'
            colorScheme='green'
            title={
              <Trans>
                Preferences
              </Trans>
            }
            icon={CategoryIdentifier}
          />
          <Can I='configure' a='Club'>
            <VerticalNavigation.Button
              href='/settings/payouts'
              colorScheme='green'
              title={
                <Trans>
                  Payouts
                </Trans>
              }
              icon={PayoutMethod}
            />
          </Can>
          <VerticalNavigation.Button
            href='/settings/billing'
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
              href='/settings/moderation'
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
          {children}
        </VerticalNavigation.Page>
      </VerticalNavigation>
    </>
  )
}
