import { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { Trans } from '@lingui/macro'

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
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {props.children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
