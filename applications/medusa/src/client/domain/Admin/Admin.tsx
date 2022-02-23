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

export default function Admin (props: Props): JSX.Element {
  return (
    <VerticalNavigation>
      <VerticalNavigation.Content
        title={
          <Trans>
            Platform Admin
          </Trans>
        }
      >
        <VerticalNavigation.Group
          title={<Trans>Characters</Trans>}
          icon={CharacterIdentifier}
          baseUrl='/admin/character'
        >
          <VerticalNavigation.Button
            to='/admin/character/create'
            title={
              <Trans>Create Character</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/admin/character/search'
            title={
              <Trans>Search Characters</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Series</Trans>}
          icon={SeriesIdentifier}
          baseUrl='/admin/series'
        >
          <VerticalNavigation.Button
            to='/admin/series/create'
            exact
            title={
              <Trans>Create Series</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/admin/series/search'
            title={
              <Trans>Search Series</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Categories</Trans>}
          icon={CategoryIdentifier}
          baseUrl='/admin/category'
        >
          <VerticalNavigation.Button
            to='/admin/category/create'
            exact
            title={
              <Trans>Create Category</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/admin/category/search'
            title={
              <Trans>Search Categories</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Audiences</Trans>}
          icon={ClubPeopleGroup}
          baseUrl='/admin/audience'
        >
          <VerticalNavigation.Button
            to='/admin/audience/create'
            title={
              <Trans>Create Audience</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/admin/audience/search'
            title={
              <Trans>Search Audiences</Trans>
            }
          />
        </VerticalNavigation.Group>
        <VerticalNavigation.Group
          title={<Trans>Rules</Trans>}
          icon={FlagReport}
          baseUrl='/admin/rule'
        >
          <VerticalNavigation.Button
            to='/admin/rule/create'
            title={
              <Trans>Create Rule</Trans>
            }
          />
          <VerticalNavigation.Button
            to='/admin/rule/search'
            title={
              <Trans>Search Rules</Trans>
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
