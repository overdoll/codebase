import Redirect from '@//:modules/routing/Redirect'
import { useLocation } from '@//:modules/routing'
import { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { FileMultiple, FlagReport, TimeHourGlass } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import Can from '@//:modules/authorization/Can'

interface Props {
  children: ReactNode
}

export default function Moderation ({ children }: Props): JSX.Element {
  const location = useLocation()

  return (
    <VerticalNavigation>
      <VerticalNavigation.Content title={
        <Trans>
          Moderation
        </Trans>
      }
      >
        <VerticalNavigation.Button
          to='/moderation/queue'
          colorScheme='purple'
          title={
            <Trans>
              Queue
            </Trans>
          }
          icon={FileMultiple}
        />
        <VerticalNavigation.Button
          to='/moderation/history'
          colorScheme='purple'
          title={
            <Trans>
              History
            </Trans>
          }
          icon={TimeHourGlass}
        />
        <Can I='staff' a='Post'>
          <VerticalNavigation.Button
            to='/moderation/reports'
            colorScheme='purple'
            title={
              <Trans>
                Reports
              </Trans>
            }
            icon={FlagReport}
          />
        </Can>
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {location.pathname === '/moderation' ? <Redirect to='/moderation/queue' /> : children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
