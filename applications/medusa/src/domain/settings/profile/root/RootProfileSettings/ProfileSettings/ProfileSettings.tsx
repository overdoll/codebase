import { Box, Stack } from '@chakra-ui/react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { ProfileSettingsQuery } from '@//:artifacts/ProfileSettingsQuery.graphql'
import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { MailEnvelope, UserHuman, WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import AccountInformationBanner
  from '../../../../../../common/components/AccountInformationBanner/AccountInformationBanner'

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
      ...AccountInformationBannerFragment
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
      <AccountInformationBanner query={data.viewer} />
      <Stack spacing={8}>
        <Box>
          <PageSectionWrap>
            <PageSectionTitle>
              <Trans>
                Account
              </Trans>
            </PageSectionTitle>
          </PageSectionWrap>
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
        </Box>
        <Box>
          <PageSectionWrap>
            <PageSectionTitle>
              <Trans>
                Danger Zone
              </Trans>
            </PageSectionTitle>
          </PageSectionWrap>
          <PagePanelWrap href='/settings/profile/delete-account'>
            <PagePanelIcon icon={WarningTriangle} colorScheme='orange' />
            <PagePanelText
              title={
                <Trans>Delete Account</Trans>
              }
              description={<Trans>Permanently delete your account</Trans>}
            />
          </PagePanelWrap>
        </Box>
      </Stack>
    </>
  )
}
