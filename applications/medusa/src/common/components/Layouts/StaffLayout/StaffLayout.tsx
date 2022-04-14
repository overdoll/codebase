import type { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { CharacterIdentifier, ClubPeopleGroup, FlagReport, SeriesIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { CategoryIdentifier } from '@//:assets/icons/interface'

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
        <VerticalNavigation.Group
          title={<Trans>Characters</Trans>}
          icon={CharacterIdentifier}
          baseUrl='/staff/character'
        >
          <VerticalNavigation.Button
            href='/staff/character/create'
            title={
              <Trans>Create Character</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/character/search'
            title={
              <Trans>Search Characters</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Series</Trans>}
          icon={SeriesIdentifier}
          baseUrl='/staff/series'
        >
          <VerticalNavigation.Button
            href='/staff/series/create'
            title={
              <Trans>Create Series</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/series/search'
            title={
              <Trans>Search Series</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Categories</Trans>}
          icon={CategoryIdentifier}
          baseUrl='/staff/category'
        >
          <VerticalNavigation.Button
            href='/staff/category/create'
            title={
              <Trans>Create Category</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/category/search'
            title={
              <Trans>Search Categories</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Audiences</Trans>}
          icon={ClubPeopleGroup}
          baseUrl='/staff/audience'
        >
          <VerticalNavigation.Button
            href='/staff/audience/create'
            title={
              <Trans>Create Audience</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/audience/search'
            title={
              <Trans>Search Audiences</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Rules</Trans>}
          icon={FlagReport}
          baseUrl='/staff/rule'
        >
          <VerticalNavigation.Button
            href='/staff/rule/create'
            title={
              <Trans>Create Rule</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/rule/search'
            title={
              <Trans>Search Rules</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Cancellation Reasons</Trans>}
          icon={FlagReport}
          baseUrl='/staff/cancellation-reason'
        >
          <VerticalNavigation.Button
            href='/staff/cancellation-reason/create'
            title={
              <Trans>Create Cancellation Reason</Trans>
            }
          />
          <VerticalNavigation.Button
            href='/staff/cancellation-reason/search'
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
