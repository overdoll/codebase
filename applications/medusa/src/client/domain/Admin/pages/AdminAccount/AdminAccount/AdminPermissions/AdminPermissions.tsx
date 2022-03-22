import { graphql, useFragment } from 'react-relay/hooks'
import { AdminPermissionsFragment$key } from '@//:artifacts/AdminPermissionsFragment.graphql'
import { Box, Stack } from '@chakra-ui/react'
import AdminLockAccount from '../AdminLockAccount/AdminLockAccount'
import AdminAssignModerator from '../AdminAssignModerator/AdminAssignModerator'
import AdminAssignStaff from '../AdminAssignStaff/AdminAssignStaff'

interface Props {
  query: AdminPermissionsFragment$key
}

const Fragment = graphql`
  fragment AdminPermissionsFragment on Account {
    ...AdminLockAccountFragment
    ...AdminAssignModeratorFragment
    ...AdminAssignStaffFragment
  }
`

export default function AdminPermissions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
      <Box>
        <AdminLockAccount query={data} />
      </Box>
      <Box>
        <AdminAssignModerator query={data} />
      </Box>
      <Box>
        <AdminAssignStaff query={data} />
      </Box>
    </Stack>
  )
}
