import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminAccountQuery } from '@//:artifacts/AdminAccountQuery.graphql'
import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import { NotFoundAccount } from '@//:modules/content/Placeholder'
import { ResourceIcon } from '@//:modules/content/PageLayout'
import AdminLockAccount from './AdminLockAccount/AdminLockAccount'
import AdminAssignModerator from './AdminAssignModerator/AdminAssignModerator'
import AdminAssignStaff from './AdminAssignStaff/AdminAssignStaff'

interface Props {
  query: PreloadedQuery<AdminAccountQuery>
}

const Query = graphql`
  query AdminAccountQuery($username: String!) {
    account(username: $username) {
      __typename
      username
      avatar {
        ...ResourceIconFragment
      }
      ...AdminLockAccountFragment
      ...AdminAssignModeratorFragment
      ...AdminAssignStaffFragment
    }
  }
`

export default function AdminAccount ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminAccountQuery>(
    Query,
    query
  )

  if (queryData?.account == null) {
    return <NotFoundAccount />
  }

  return (
    <Stack spacing={6}>
      <HStack spacing={2}>
        <ResourceIcon w={14} h={14} query={queryData?.account?.avatar} />
        <Heading color='gray.00' fontSize='2xl'>
          {queryData?.account?.username}
        </Heading>
      </HStack>
      <Stack spacing={8}>
        <Box>
          <AdminLockAccount query={queryData.account} />
        </Box>
        <Box>
          <AdminAssignModerator query={queryData.account} />
        </Box>
        <Box>
          <AdminAssignStaff query={queryData.account} />
        </Box>
      </Stack>
    </Stack>
  )
}
