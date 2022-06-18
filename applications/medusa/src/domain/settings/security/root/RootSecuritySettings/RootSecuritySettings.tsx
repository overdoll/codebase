import type { PreloadedQuery } from 'react-relay/hooks'
import type {
  MultiFactorSettingsQuery as MultiFactorSettingsQueryType
} from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap,
  PageWrapper
} from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Box, Stack } from '@chakra-ui/react'
import { DesktopComputer } from '@//:assets/icons'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import RootMultiFactorSettings from './RootMultiFactorSettings/RootMultiFactorSettings'

interface Props {
  queryRefs: {
    multiFactorSettingsQuery: PreloadedQuery<MultiFactorSettingsQueryType>
  }
}

const RootSecuritySettings: PageProps<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>
          Security Settings - overdoll
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          <Box>
            <RootMultiFactorSettings query={props.queryRefs.multiFactorSettingsQuery} />
          </Box>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Sessions
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <PagePanelWrap href='/settings/security/sessions'>
              <PagePanelIcon icon={DesktopComputer} colorScheme='orange' />
              <PagePanelText
                title={
                  <Trans>Account Sessions</Trans>
                }
                description={(
                  <Trans>
                    Account login history
                  </Trans>
                )}
              />
            </PagePanelWrap>
          </Box>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootSecuritySettings
