import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubTerminationFragment$key } from '@//:artifacts/StaffClubTerminationFragment.graphql'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import {
  LargeBackgroundBox,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import StaffClubUnTerminateButton from './StaffClubUnTerminateButton/StaffClubUnTerminateButton'
import StaffClubTerminateForm from './StaffClubTerminateButton/StaffClubTerminateForm'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import StaffClubCancelActiveSupporterSubscriptionsForClub
  from './StaffClubCancelActiveSupporterSubscriptionsForClub/StaffClubCancelActiveSupporterSubscriptionsForClub'

interface Props {
  query: StaffClubTerminationFragment$key
}

const Fragment = graphql`
  fragment StaffClubTerminationFragment on Club {
    termination {
      __typename
    }
    ...StaffClubTerminateFormFragment
    ...StaffClubUnTerminateButtonFragment
    ...StaffClubCancelActiveSupporterSubscriptionsForClubFragment
  }
`

export default function StaffClubTermination ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const isTerminated = data.termination != null

  return (
    <Stack spacing={16}>
      <LargeBackgroundBox>
        <Heading fontSize='xl' color='gray.00'>
          <Trans>
            Termination Order
          </Trans>
        </Heading>
        <Text fontSize='md' color='gray.100'>
          <Trans>
            In the event that you would like to terminate a club off of a platform completely, the suggested order of
            actions is...
          </Trans>
        </Text>
        <Stack spacing={1} mt={4}>
          <Text fontSize='md' color='gray.100'>
            <Trans>
              Suspend the club so they cannot receive new subscribers
            </Trans>
          </Text>
          <Text fontSize='md' color='gray.100'>
            <Trans>
              Cancel all subscriptions and wait for the benefits to expire
            </Trans>
          </Text>
          <Text fontSize='md' color='gray.100'>
            <Trans>
              Terminate the club so it becomes inaccessible
            </Trans>
          </Text>
        </Stack>
      </LargeBackgroundBox>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Cancel Active Supporter Subscriptions
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Cancel all active supporter subscriptions. You must first suspend the club so they cannot receive anymore
              supporter subscriptions. This must only be done in extreme cases where the club owner refuses to post on
              schedule.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <Collapse>
          <CollapseButton>
            <Trans>
              Cancel Supporter Subscriptions
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <StaffClubCancelActiveSupporterSubscriptionsForClub query={data} />
          </CollapseBody>
        </Collapse>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Terminate Club
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Terminating a club will make all of its content and public page inaccessible. You must first cancel all
              supporter subscriptions and wait for them to expire before terminating a club.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <Collapse>
          <CollapseButton>
            {isTerminated
              ? (
                <Trans>
                  Remove Termination
                </Trans>
                )
              : (
                <Trans>
                  Terminate Club
                </Trans>
                )}
          </CollapseButton>
          <CollapseBody>
            {isTerminated
              ? <StaffClubUnTerminateButton query={data} />
              : <StaffClubTerminateForm query={data} />}
          </CollapseBody>
        </Collapse>
      </Box>
    </Stack>
  )
}
