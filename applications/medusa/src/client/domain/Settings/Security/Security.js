/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import RootMultiFactorSettings from './RootMultiFactorSettings/RootMultiFactorSettings'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import type { SessionsSettingsQuery } from '@//:artifacts/SessionsSettingsQuery.graphql'
import { PageWrapper } from '../../../components/PageLayout'
import { Stack, Box } from '@chakra-ui/react'
import RootSessionsSettings from './RootSessionsSettings/RootSessionsSettings'

type Props = {
  prepared: {
    multiFactorQuery: PreloadedQueryInner<MultiFactorSettingsQuery>,
    sessionsQuery: PreloadedQueryInner<SessionsSettingsQuery>
  }
};

export default function Security (props: Props): Node {
  return (
    <>
      <Helmet title='security settings' />
      <PageWrapper>
        <Stack spacing={8}>
          <Box>
            <RootMultiFactorSettings query={props.prepared.multiFactorQuery} />
          </Box>
          <Box>
            <RootSessionsSettings query={props.prepared.sessionsQuery} />
          </Box>
        </Stack>
      </PageWrapper>
    </>
  )
}
