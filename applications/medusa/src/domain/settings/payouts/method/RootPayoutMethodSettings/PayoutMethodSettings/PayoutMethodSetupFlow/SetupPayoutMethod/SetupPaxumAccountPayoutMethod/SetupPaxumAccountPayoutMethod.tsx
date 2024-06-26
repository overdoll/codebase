import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import { ExternalLink } from '@//:modules/routing'
import { PaxumLogo } from '@//:assets/logos'
import { Icon, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { graphql, useFragment } from 'react-relay/hooks'
import { SetupPaxumAccountPayoutMethodFragment$key } from '@//:artifacts/SetupPaxumAccountPayoutMethodFragment.graphql'
import SetPaxumAccountPayoutMethodForm from './SetPaxumAccountPayoutMethodForm/SetPaxumAccountPayoutMethodForm'

interface Props {
  query: SetupPaxumAccountPayoutMethodFragment$key
}

const Fragment = graphql`
  fragment SetupPaxumAccountPayoutMethodFragment on Account {
    details @required(action: THROW) {
      firstName
      lastName
    }
  }
`

export default function SetupPaxumAccountPayoutMethod ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
      <SmallBackgroundBox>
        <HStack align='center' justify='space-between'>
          <Heading color='gray.00' fontSize='xl'>
            <Trans>
              Paxum
            </Trans>
          </Heading>
          <Icon icon={PaxumLogo} h={4} />
        </HStack>
      </SmallBackgroundBox>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Heading color='gray.00' fontSize='xl'>
            <Trans>
              Create an account and get verified
            </Trans>
          </Heading>
          <Text color='gray.100' fontSize='sm'>
            <Trans>
              To set up Paxum as a payout method, you must create an account and have it verified by providing the
              necessary
              documentation through a Know Your Client procedure. This process will require you to provide a
              government-issued ID and a statement for address verification.
            </Trans>
          </Text>
        </Stack>
        <ExternalLink href='https://portal.paxum.com/register'>
          <Button w='100%' size='md' colorScheme='gray'>
            <Trans>
              Open Paxum Sign Up Link
            </Trans>
          </Button>
        </ExternalLink>
      </Stack>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Heading color='gray.00' fontSize='xl'>
            <Trans>
              Enter your Paxum payments email
            </Trans>
          </Heading>
          <Text color='gray.100' fontSize='sm'>
            <Trans>
              Once your account is verified, please enter your Paxum email for receiving payments. Entering an
              unverified
              or invalid account email will result in failed payouts and a frozen balance.
            </Trans>
          </Text>
          <Text color='gray.100' fontSize='sm'>
            <Trans>
              Make sure that the First name ({data.details.firstName}) and Last name ({data.details.lastName}) you have
              entered in your Payout Details match the First name and Last
              name on your Paxum account. Otherwise, any payouts we send will fail.
            </Trans>
          </Text>
        </Stack>
        <SetPaxumAccountPayoutMethodForm />
      </Stack>
    </Stack>
  )
}
