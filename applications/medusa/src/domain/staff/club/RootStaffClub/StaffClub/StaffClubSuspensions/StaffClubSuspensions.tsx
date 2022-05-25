import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubSuspensionsFragment$key } from '@//:artifacts/StaffClubSuspensionsFragment.graphql'
import { Box, Stack } from '@chakra-ui/react'
import StaffClubSuspensionLogs from './StaffClubSuspensionLogs/StaffClubSuspensionLogs'
import StaffClubInfractions from './StaffClubInfractions/StaffClubInfractions'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  query: StaffClubSuspensionsFragment$key
}

const Fragment = graphql`
  fragment StaffClubSuspensionsFragment on Club {
    ...StaffClubSuspensionLogsFragment
    ...StaffClubInfractionsFragment
  }
`

export default function StaffClubSuspensions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Suspension Logs
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <StaffClubSuspensionLogs query={data} />
      </Box>
      <Box>
        <StaffClubInfractions query={data} />
      </Box>
    </Stack>
  )
}
