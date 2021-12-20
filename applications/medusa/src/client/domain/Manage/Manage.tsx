import { useLocation } from '@//:modules/routing'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { ContentBookEdit, SettingHammer } from '@//:assets/icons/navigation'
import { Trans } from '@lingui/macro'
import { formatDistance } from 'date-fns'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import Redirect from '@//:modules/routing/Redirect'

interface Props {
  children: Node
}

export default function Manage ({ children }: Props): JSX.Element {
  const location = useLocation()

  const { i18n } = useLingui()

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
        {formatDistance(new Date(), new Date().getTime() + 6000000, { locale: dateFnsLocaleFromI18n(i18n) })}
        {location.pathname === '/manage' ? <Redirect to='/manage/posts' /> : children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
