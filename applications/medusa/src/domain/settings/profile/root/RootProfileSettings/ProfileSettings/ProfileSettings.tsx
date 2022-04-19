import { Stack } from '@chakra-ui/react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { ProfileSettingsQuery } from '@//:artifacts/ProfileSettingsQuery.graphql'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { MailEnvelope, UserHuman } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import LockedAccountBanner from '../../../../../../common/components/LockedAccount/LockedAccountBanner/LockedAccountBanner'

interface Props {
  query: PreloadedQuery<ProfileSettingsQuery>
}

const Query = graphql`
  query ProfileSettingsQuery {
    viewer @required(action: THROW) {
      username
      emails {
        edges {
          node {
            email
            status
          }
        }
      }
      ...LockedAccountBannerFragment
    }
  }
`

export default function ProfileSettings (props: Props): JSX.Element {
  const data = usePreloadedQuery<ProfileSettingsQuery>(
    Query,
    props.query
  )
  const primaryEmail = data.viewer.emails.edges.filter((item) => item.node.status === 'PRIMARY')

  return (
    <>
      <LockedAccountBanner query={data.viewer} />
      <Stack spacing={2}>
        <PagePanelWrap href='/settings/profile/username'>
          <PagePanelIcon icon={UserHuman} colorScheme='green' />
          <PagePanelText
            title={
              <Trans>Manage Username</Trans>
            }
            description={data.viewer.username}
          />
        </PagePanelWrap>
        <PagePanelWrap href='/settings/profile/emails'>
          <PagePanelIcon icon={MailEnvelope} colorScheme='teal' />
          <PagePanelText
            title={
              <Trans>Manage Emails</Trans>
            }
            description={primaryEmail[0].node.email}
          />
        </PagePanelWrap>
      </Stack>
    </>
  )
}
