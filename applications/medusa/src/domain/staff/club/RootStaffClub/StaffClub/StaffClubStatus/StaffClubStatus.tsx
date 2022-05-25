import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubStatusFragment$key } from '@//:artifacts/StaffClubStatusFragment.graphql'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import useCountdown from '@//:modules/hooks/useCountdown'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import StaffClubUnSuspendButton from './StaffClubUnSuspendButton/StaffClubUnSuspendButton'
import SuspendClubForm from './SuspendClubForm/SuspendClubForm'

interface Props {
  query: StaffClubStatusFragment$key
}

const Fragment = graphql`
  fragment StaffClubStatusFragment on Club {
    suspension {
      expires
    }
    termination {
      account {
        username
      }
    }
    ...SuspendClubFormFragment
    ...StaffClubUnSuspendButtonFragment
  }
`

export default function StaffClubStatus ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    hasPassed,
    remaining
  } = useCountdown(data?.suspension?.expires)

  const isSuspended = data.suspension != null

  const isTerminated = data.termination != null

  const isDisabled = data.termination != null

  const DetermineHeader = (): JSX.Element => {
    if (isTerminated) {
      return (
        <LargeBackgroundBox>
          <Heading fontSize='2xl' color='orange.400'>
            <Trans>
              Terminated
            </Trans>
          </Heading>
          <Text color='gray.200' fontSize='lg'>
            <Trans>
              The club was terminated by {data.termination.account.username}. You won't be able to find the club or its
              posts on the platform.
            </Trans>
          </Text>
        </LargeBackgroundBox>
      )
    }

    if (isSuspended) {
      return (
        <LargeBackgroundBox>
          <Heading fontSize='2xl' color='purple.400'>
            <Trans>
              Suspended
            </Trans>
          </Heading>
          {hasPassed
            ? (
              <Text color='gray.200' fontSize='lg'>
                <Trans>
                  The club is suspended but can be unsuspended by owner
                </Trans>
              </Text>
              )
            : (
              <Text color='gray.200' fontSize='lg'>
                <Trans>
                  The club is suspended until {remaining}
                </Trans>
              </Text>
              )}
          <Text color='gray.200' fontSize='lg'>
            <Trans>
              The owner cannot post or collect new subscriptions, but the page and content are still accessible.
            </Trans>
          </Text>
        </LargeBackgroundBox>
      )
    }

    return (
      <LargeBackgroundBox>
        <Heading fontSize='2xl' color='green.400'>
          <Trans>
            Active
          </Trans>
        </Heading>
        <Text color='gray.200' fontSize='lg'>
          <Trans>
            The club is active and all features are accessible.
          </Trans>
        </Text>
      </LargeBackgroundBox>
    )
  }

  return (
    <Stack spacing={2}>
      <DetermineHeader />
      {(isSuspended && !isTerminated)
        ? (
          <Collapse>
            <CollapseButton isDisabled={isDisabled}>
              <Trans>
                Remove Suspension
              </Trans>
            </CollapseButton>
            <CollapseBody>
              <StaffClubUnSuspendButton query={data} />
            </CollapseBody>
          </Collapse>)
        : (
          <Collapse>
            <CollapseButton isDisabled={isDisabled}>
              <Trans>
                Suspend Club
              </Trans>
            </CollapseButton>
            <CollapseBody>
              <SuspendClubForm query={data} />
            </CollapseBody>
          </Collapse>)}
    </Stack>
  )
}
