import { Redirect } from 'react-router'
import { useLocation } from '@//:modules/routing'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { ContentBookEdit, SettingHammer } from '@//:assets/icons/navigation'
import { Trans } from '@lingui/macro'
import { formatDistance } from '@//:modules/date'

interface Props {
  children: Node
}

export default function Manage ({ children }: Props): JSX.Element {
  const location = useLocation()

  return (
    <VerticalNavigation>
      <VerticalNavigation.Content title='3'>
        <VerticalNavigation.Button
          to='/manage/my_posts'
          title='t'
          icon={ContentBookEdit}
        />
        <VerticalNavigation.Button
          to='/manage/brands'
          title='t2'
          icon={SettingHammer}
        />
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        <Trans comment='yes this is a comment' id='known'>Hello theres2d</Trans>
        {formatDistance(new Date(), new Date().getTime() + 6000000)}
        {location.pathname === '/manage' ? <Redirect to='/manage/posts' /> : children}
      </VerticalNavigation.Page>
    </VerticalNavigation>

  )
}
