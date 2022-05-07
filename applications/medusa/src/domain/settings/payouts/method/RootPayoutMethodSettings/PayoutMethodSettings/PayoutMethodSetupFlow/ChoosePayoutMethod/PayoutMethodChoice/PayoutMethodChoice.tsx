import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { PaxumLogo } from '@//:assets/logos'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import type { PayoutMethod } from '@//:artifacts/ChoosePayoutMethodFragment.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  payoutMethod: PayoutMethod
}

export default function PayoutMethodChoice ({ payoutMethod }: Props): JSX.Element {
  switch (payoutMethod) {
    case 'PAXUM':
      return (
        <LargeBackgroundBox h='100%' w='100%'>
          <Stack align='flex-start' spacing={2}>
            <HStack align='center' w='100%' justify='space-between'>
              <Heading color='gray.00' fontSize='xl'>
                <Trans>
                  Paxum
                </Trans>
              </Heading>
              <Icon icon={PaxumLogo} h={4} />
            </HStack>
            <Text color='gray.100' fontSize='sm'>
              <Trans>
                Paxum is an E-wallet service that allows you to receive payouts and withdraw them to a local bank
                account,
                card, or wire transfer. You will be required to create and verify an account.
              </Trans>
            </Text>
          </Stack>
        </LargeBackgroundBox>
      )
    default:
      return <></>
  }
}
