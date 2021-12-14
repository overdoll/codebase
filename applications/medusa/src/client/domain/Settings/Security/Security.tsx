import { Helmet } from 'react-helmet-async'
import RootMultiFactorSettings from './RootMultiFactorSettings/RootMultiFactorSettings'
import type { MultiFactorSettingsQuery } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import type { SessionsSettingsQuery } from '@//:artifacts/SessionsSettingsQuery.graphql'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Box, Stack } from '@chakra-ui/react'
import RootSessionsSettings from './RootSessionsSettings/RootSessionsSettings'
import { PreloadedQuery } from 'react-relay/hooks'

interface Props {
  prepared: {
    multiFactorQuery: PreloadedQuery<MultiFactorSettingsQuery>
    sessionsQuery: PreloadedQuery<SessionsSettingsQuery>
  }
}

export default function Security (props: Props): JSX.Element {
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
