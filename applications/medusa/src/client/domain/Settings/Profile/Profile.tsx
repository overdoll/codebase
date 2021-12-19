import { Helmet } from 'react-helmet-async'
import { Box, Stack } from '@chakra-ui/react'
import type { PreloadedQuery } from 'react-relay/hooks'
import type { UsernamesQuery } from '@//:artifacts/UsernamesQuery.graphql'
import type { EmailsQuery } from '@//:artifacts/EmailsQuery.graphql'
import RootEmails from './RootEmails/RootEmails'
import RootUsernames from './RootUsernames/RootUsernames'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  prepared: {
    usernamesQuery: PreloadedQuery<UsernamesQuery>
    emailsQuery: PreloadedQuery<EmailsQuery>
  }
}

export default function Profile (props: Props): JSX.Element {
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