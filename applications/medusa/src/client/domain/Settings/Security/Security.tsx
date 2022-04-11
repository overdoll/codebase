import { Helmet } from 'react-helmet-async'
import RootMultiFactorSettings from './RootMultiFactorSettings/RootMultiFactorSettings'
import type { MultiFactorSettingsQuery } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap,
  PageWrapper
} from '@//:modules/content/PageLayout'
import { Box, Stack } from '@chakra-ui/react'
import { PreloadedQuery } from 'react-relay/hooks'
import { DesktopComputer } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import ChildrenBoundary from '../../../../modules/content/Placeholder/Fallback/ChildrenBoundary/ChildrenBoundary'
import { ReactNode } from 'react'

interface Props {
  prepared: {
    query: PreloadedQuery<MultiFactorSettingsQuery>
  }
  children: ReactNode
}

export default function Security (props: Props): JSX.Element {
  return (
    <ChildrenBoundary fallback={props.children}>
      <Helmet>
        <title>
          Security - Settings :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <Stack spacing={8}>
          <Box>
            <RootMultiFactorSettings query={props.prepared.query} />
          </Box>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Sessions
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <PagePanelWrap path='/settings/security/sessions'>
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
    </ChildrenBoundary>
  )
}
