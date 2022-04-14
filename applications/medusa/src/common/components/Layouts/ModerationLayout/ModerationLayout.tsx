import type { ReactNode } from 'react'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { FileMultiple, FlagReport, TimeHourGlass } from '@//:assets/icons'
import Can from '@//:modules/authorization/Can'
import { Trans } from '@lingui/macro'

interface Props {
  children: ReactNode
}

export default function ModerationLayout ({ children }: Props): JSX.Element {
  return (
    <VerticalNavigation>
      <VerticalNavigation.Content title={
        <Trans>
          Moderation
        </Trans>
      }
      >
        <VerticalNavigation.Button
          href='/moderation/posts-queue'
          colorScheme='purple'
          title={
            <Trans>
              Posts Queue
            </Trans>
          }
          icon={FileMultiple}
        />
        <VerticalNavigation.Button
          href='/moderation/audit-logs'
          colorScheme='purple'
          title={
            <Trans>
              Audit Logs
            </Trans>
          }
          icon={TimeHourGlass}
        />
        <Can I='staff' a='Post'>
          <VerticalNavigation.Button
            href='/moderation/post-reports'
            colorScheme='purple'
            title={
              <Trans>
                Post Reports
              </Trans>
            }
            icon={FlagReport}
          />
        </Can>
      </VerticalNavigation.Content>
      <VerticalNavigation.Page>
        {children}
      </VerticalNavigation.Page>
    </VerticalNavigation>
  )
}
