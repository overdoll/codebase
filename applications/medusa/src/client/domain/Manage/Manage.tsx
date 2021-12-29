import { useLocation } from '@//:modules/routing'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { ContentBookEdit, SettingHammer } from '@//:assets/icons/navigation'
import { Trans } from '@lingui/macro'
import Redirect from '@//:modules/routing/Redirect'

interface Props {
  children: Node
}

export default function Manage ({ children }: Props): JSX.Element {
  const location = useLocation()

  return (
    <VerticalNavigation>
      <VerticalNavigation.Content title={(
        <Trans>Post Management</Trans>
      )}
      >
        <VerticalNavigation.Button
          to='/manage/posts'
          colorScheme='teal'
          title={
            <Trans>My Posts</Trans>
          }
          icon={ContentBookEdit}
        />
        <VerticalNavigation.Button
          to='/manage/brands'
          colorScheme='teal'
          title={
            <Trans>Manage Brands</Trans>
          }
          icon={SettingHammer}
        />
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {location.pathname === '/manage' ? <Redirect to='/manage/posts' /> : children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
