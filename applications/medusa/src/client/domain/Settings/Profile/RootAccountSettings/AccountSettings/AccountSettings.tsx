import { Stack } from '@chakra-ui/react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { AccountSettingsQuery } from '@//:artifacts/AccountSettingsQuery.graphql'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { MailEnvelope, UserHuman } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<AccountSettingsQuery>
}

const MultiFactorQueryGQL = graphql`
  query AccountSettingsQuery {
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
    }
  }
`

export default function AccountSettings (props: Props): JSX.Element {
  const data = usePreloadedQuery<AccountSettingsQuery>(
    MultiFactorQueryGQL,
    props.query
  )
  const primaryEmail = data.viewer.emails.edges.filter((item) => item.node.status === 'PRIMARY')

  return (
    <Stack spacing={2}>
      <PagePanelWrap path='/settings/profile/username'>
        <PagePanelIcon icon={UserHuman} colorScheme='green' />
        <PagePanelText
          title={
            <Trans>Manage Username</Trans>
          }
          description={data.viewer.username}
        />
      </PagePanelWrap>
      <PagePanelWrap path='/settings/profile/emails'>
        <PagePanelIcon icon={MailEnvelope} colorScheme='teal' />
        <PagePanelText
          title={
            <Trans>Manage Emails</Trans>
          }
          description={primaryEmail[0].node.email}
        />
      </PagePanelWrap>
    </Stack>
  )
}
