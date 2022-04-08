import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubStatusFragment$key } from '@//:artifacts/StaffClubStatusFragment.graphql'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import useCountdown from '@//:modules/hooks/useCountdown'
import StaffClubUnSuspendButton from './StaffClubUnSuspendButton/StaffClubUnSuspendButton'
import SuspendClubForm from '../StaffClubInfractions/SuspendClubForm/SuspendClubForm'

interface Props {
  query: StaffClubStatusFragment$key
}

const Fragment = graphql`
  fragment StaffClubStatusFragment on Club {
    suspension {
      expires
    }
    ...SuspendClubFormFragment
    ...StaffClubUnSuspendButtonFragment
  }
`

export default function StaffClubStatus ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const isSuspended = data.suspension != null

  const {
    hasPassed,
    remaining
  } = useCountdown(data?.suspension?.expires)

  return (
    <Stack spacing={2}>
      <SmallBackgroundBox>
        <Flex w='100%' h='100%' align='center' justify='center'>
          <Heading color={isSuspended ? 'orange.400' : 'green.400'} fontSize='3xl'>
            {isSuspended
              ? (
                <Trans>
                  Suspended
                </Trans>)
              : (
                <Trans>
                  Active
                </Trans>)}
          </Heading>
        </Flex>
      </SmallBackgroundBox>
      {isSuspended
        ? (
          <>
            <SmallBackgroundBox h={10}>
              <Flex w='100%' h='100%' align='center' justify='center'>
                <Text color='gray.00' fontSize='lg'>
                  {hasPassed ? remaining : <Trans>Can be unlocked</Trans>}
                </Text>
              </Flex>
            </SmallBackgroundBox>
            <Collapse>
              <CollapseButton>
                <Trans>
                  Remove Suspension
                </Trans>
              </CollapseButton>
              <CollapseBody>
                <StaffClubUnSuspendButton query={data} />
              </CollapseBody>
            </Collapse>
          </>)
        : (
          <Collapse>
            <CollapseButton>
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
