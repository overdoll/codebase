import { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { Trans } from '@lingui/macro'
import { ContentBrushPen } from '@//:assets/icons/navigation'

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
          icon={ContentBrushPen}
        />
        <VerticalNavigation.Button
          to='/admin/category/search'
          title={
            <Trans>Search Categories</Trans>
          }
          icon={ContentBrushPen}
        />
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {props.children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
