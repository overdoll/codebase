import { Redirect } from 'react-router'
import { useLocation } from '@//:modules/routing'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { ContentBookEdit, SettingHammer } from '@//:assets/icons/navigation'
import { useTranslation } from 'react-i18next'

interface Props {
  children: Node
}

export default function Manage ({ children }: Props): JSX.Element {
  const location = useLocation()

  const [t] = useTranslation('navigation')

  return (
    <VerticalNavigation>
      <VerticalNavigation.Content title={t('sidebar.manage.title')}>
        <VerticalNavigation.Button
          to='/manage/my_posts'
          title={t('sidebar.manage.my_posts')}
          icon={ContentBookEdit}
        />
        <VerticalNavigation.Button
          to='/manage/brands'
          title={t('sidebar.manage.brand')}
          icon={SettingHammer}
        />
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {location.pathname === '/manage' ? <Redirect to='/manage/posts' /> : children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
