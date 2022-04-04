import { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { Trans } from '@lingui/macro'
import {
  CategoryIdentifier,
  CharacterIdentifier,
  ClubPeopleGroup,
  FlagReport,
  SeriesIdentifier
} from '@//:assets/icons'

interface Props {
  children: ReactNode
}

export default function Staff (props: Props): JSX.Element {
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
            to='/staff/character/create'
            title={
              <Trans>Create Character</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/staff/character/search'
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
            to='/staff/series/create'
            exact
            title={
              <Trans>Create Series</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/staff/series/search'
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
            to='/staff/category/create'
            exact
            title={
              <Trans>Create Category</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/staff/category/search'
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
            to='/staff/audience/create'
            title={
              <Trans>Create Audience</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/staff/audience/search'
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
            to='/staff/rule/create'
            title={
              <Trans>Create Rule</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/staff/rule/search'
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
            to='/staff/cancellation-reason/create'
            title={
              <Trans>Create Cancellation Reason</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/staff/cancellation-reason/search'
            title={
              <Trans>Search Cancellation Reasons</Trans>
            }
          />
        </VerticalNavigation.Group>
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {props.children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
