import { graphql, useFragment } from 'react-relay/hooks'
import { AdminClubStatusFragment$key } from '@//:artifacts/AdminClubStatusFragment.graphql'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import useCountdown from '../../../../../../../modules/hooks/useCountdown'
import AdminClubUnSuspendButton from './AdminClubUnSuspendButton/AdminClubUnSuspendButton'
import SuspendClubForm from '../AdminClubInfractions/SuspendClubForm/SuspendClubForm'

interface Props {
  query: AdminClubStatusFragment$key
}

const Fragment = graphql`
  fragment AdminClubStatusFragment on Club {
    suspension {
      expires
    }
    ...SuspendClubFormFragment
    ...AdminClubUnSuspendButtonFragment
  }
`

export default function AdminClubStatus ({ query }: Props): JSX.Element {
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
      {!hasPassed && (
        <SmallBackgroundBox>
          <Flex w='100%' h='100%' align='center' justify='center'>
            <Text color='gray.00' fontSize='lg'>
              {remaining}
            </Text>
          </Flex>
        </SmallBackgroundBox>)}
      {isSuspended
        ? (
          <Collapse>
            <CollapseButton>
              <Trans>
                Remove Suspension
              </Trans>
            </CollapseButton>
            <CollapseBody>
              <AdminClubUnSuspendButton query={data} />
            </CollapseBody>
          </Collapse>)
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
