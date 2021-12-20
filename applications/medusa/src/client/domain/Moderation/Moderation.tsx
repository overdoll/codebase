import Redirect from '@//:modules/routing/Redirect'
import { useLocation } from '@//:modules/routing'
import { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/VerticalNavigation/VerticalNavigation'
import { FileMultiple, TimeHourGlass } from '@//:assets/icons/navigation'
import { useTranslation } from 'react-i18next'

interface Props {
  children: ReactNode
}

export default function Moderation ({ children }: Props): JSX.Element {
  const location = useLocation()

  const [t] = useTranslation('navigation')

  return (
    <VerticalNavigation>
      <VerticalNavigation.Content title={t('sidebar.mod.title')}>
        <VerticalNavigation.Button
          to='/moderation/queue'
          title={t('sidebar.mod.queue')}
          icon={FileMultiple}
        />
        <VerticalNavigation.Button
          to='/moderation/history'
          title={t('sidebar.mod.history')}
          icon={TimeHourGlass}
        />
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {location.pathname === '/moderation' ? <Redirect to='/moderation/queue' /> : children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
