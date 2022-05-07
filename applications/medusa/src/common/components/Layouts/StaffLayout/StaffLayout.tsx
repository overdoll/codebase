import type { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import {
  CategoryIdentifier,
  CharacterIdentifier,
  ClubPeopleGroup,
  FlagReport,
  PayoutMethod,
  SeriesIdentifier
} from '@//:assets/icons'
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
        <Can I='staff' a='Billing'>
          <VerticalNavigation.Button
            href='/staff/billing/deposit-requests'
            icon={PayoutMethod}
            title={
              <Trans>Deposit Requests</Trans>
            }
          />
        </Can>
        <VerticalNavigation.Group
          title={<Trans>Characters</Trans>}
          icon={CharacterIdentifier}
          baseUrl='/staff/entity/character'
        >
          <VerticalNavigation.Button
            href='/staff/entity/character/create'
            title={
              <Trans>Create Character</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/entity/character/search'
            title={
              <Trans>Search Characters</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Series</Trans>}
          icon={SeriesIdentifier}
          baseUrl='/staff/entity/series'
        >
          <VerticalNavigation.Button
            href='/staff/entity/series/create'
            title={
              <Trans>Create Series</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/entity/series/search'
            title={
              <Trans>Search Series</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Categories</Trans>}
          icon={CategoryIdentifier}
          baseUrl='/staff/entity/category'
        >
          <VerticalNavigation.Button
            href='/staff/entity/category/create'
            title={
              <Trans>Create Category</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/entity/category/search'
            title={
              <Trans>Search Categories</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Audiences</Trans>}
          icon={ClubPeopleGroup}
          baseUrl='/staff/entity/audience'
        >
          <VerticalNavigation.Button
            href='/staff/entity/audience/create'
            title={
              <Trans>Create Audience</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/entity/audience/search'
            title={
              <Trans>Search Audiences</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Rules</Trans>}
          icon={FlagReport}
          baseUrl='/staff/entity/rule'
        >
          <VerticalNavigation.Button
            href='/staff/entity/rule/create'
            title={
              <Trans>Create Rule</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/entity/rule/search'
            title={
              <Trans>Search Rules</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Cancellation Reasons</Trans>}
          icon={FlagReport}
          baseUrl='/staff/entity/cancellation-reason'
        >
          <VerticalNavigation.Button
            href='/staff/entity/cancellation-reason/create'
            title={
              <Trans>Create Cancellation Reason</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/entity/cancellation-reason/search'
            title={
              <Trans>Search Cancellation Reasons</Trans>
            }
          />
        </VerticalNavigation.Group>
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
