/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Box,
  Stack
} from '@chakra-ui/react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { UsernamesQuery } from '@//:artifacts/UsernamesQuery.graphql'
import type { PreparedEmailsQuery } from '@//:artifacts/PreparedEmailsQuery.graphql'
import RootEmails from './RootEmails/RootEmails'
import RootUsernames from './RootUsernames/RootUsernames'
import { PageWrapper } from '../../../../modules/content/PageLayout'

type Props = {
  prepared: {
    usernamesQuery: PreloadedQueryInner<UsernamesQuery>,
    emailsQuery: PreloadedQueryInner<PreparedEmailsQuery>,
  }
};

export default function Profile (props: Props): Node {
  return (
    <>
      <Helmet title='profile settings' />
      <PageWrapper>
        <Stack spacing={8}>
          <Box>
            <RootUsernames query={props.prepared.usernamesQuery} />
          </Box>
          <Box>
            <RootEmails query={props.prepared.emailsQuery} />
          </Box>
        </Stack>
      </PageWrapper>
    </>
  )
}
