import type { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { CategoryIdentifier, PayoutMethod } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import Can from '@//:modules/authorization/Can'

interface Props {
  children: ReactNode
}

export default function StaffLayout ({ children }: Props): JSX.Element {
  return (
    <VerticalNavigation>
      <VerticalNavigation.Content
        title={
          <Trans>
            Platform Staff
          </Trans>
        }
      >
        <Can I='staff' a='Entity'>
          <VerticalNavigation.Button
            href='/staff/entity'
            icon={CategoryIdentifier}
            title={
              <Trans>Manage Entity</Trans>
            }
          />
        </Can>
        <Can I='staff' a='Billing'>
          <VerticalNavigation.Button
            href='/staff/billing/deposit-requests'
            icon={PayoutMethod}
            title={
              <Trans>Deposit Requests</Trans>
            }
          />
        </Can>
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
