import { graphql, useFragment } from 'react-relay/hooks'
import { StaffPermissionsFragment$key } from '@//:artifacts/StaffPermissionsFragment.graphql'
import { Box, Stack } from '@chakra-ui/react'
import StaffLockAccount from '../StaffLockAccount/StaffLockAccount'
import StaffAssignModerator from '../StaffAssignModerator/StaffAssignModerator'
import StaffAssignStaff from '../StaffAssignStaff/StaffAssignStaff'
import StaffAssignArtist from '../StaffAssignArtist/StaffAssignArtist'

interface Props {
  query: StaffPermissionsFragment$key
}

const Fragment = graphql`
  fragment StaffPermissionsFragment on Account {
    ...StaffLockAccountFragment
    ...StaffAssignModeratorFragment
    ...StaffAssignStaffFragment
    ...StaffAssignArtistFragment
  }
`

export default function StaffPermissions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={12}>
      <StaffAssignArtist query={data} />
      <Stack spacing={8}>
        <Box>
          <StaffLockAccount query={data} />
        </Box>
        <Box>
          <StaffAssignModerator query={data} />
        </Box>
        <Box>
          <StaffAssignStaff query={data} />
        </Box>
      </Stack>
    </Stack>
  )
}
