import { graphql, useFragment } from 'react-relay/hooks'
import type { PayoutsDetailsSettingsFragment$key } from '@//:artifacts/PayoutsDetailsSettingsFragment.graphql'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LargeBackgroundBox, PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { PayoutDetails } from '@//:assets/icons'

interface Props {
  query: PayoutsDetailsSettingsFragment$key
}

const Fragment = graphql`
  fragment PayoutsDetailsSettingsFragment on Account {
    details {
      id
      firstName
      lastName
      country {
        name
        emoji
      }
    }
  }
`

export default function PayoutsDetailsSettings ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      {data.details != null && (
        <LargeBackgroundBox>
          <Stack spacing={2}>
            <Heading fontSize='lg' color='gray.00'>
              <Trans>
                Your Payout Details
              </Trans>
            </Heading>
            <Stack spacing={1}>
              <HStack spacing={2}>
                <Heading fontSize='sm' color='gray.100'>
                  <Trans>
                    First Name
                  </Trans>
                </Heading>
                <Heading fontSize='sm' color='gray.200'>
                  {data.details.firstName}
                </Heading>
              </HStack>
              <HStack spacing={2}>
                <Heading fontSize='sm' color='gray.100'>
                  <Trans>
                    Last Name
                  </Trans>
                </Heading>
                <Heading fontSize='sm' color='gray.200'>
                  {data.details.lastName}
                </Heading>
              </HStack>
              <HStack spacing={2}>
                <Heading fontSize='sm' color='gray.100'>
                  <Trans>
                    Country
                  </Trans>
                </Heading>
                <Heading fontSize='sm' color='gray.200'>
                  {data.details.country.emoji} {data.details.country.name}
                </Heading>
              </HStack>
            </Stack>
          </Stack>
        </LargeBackgroundBox>
      )}
      <PagePanelWrap href='/settings/payouts/details'>
        <PagePanelIcon icon={PayoutDetails} colorScheme='purple' />
        <PagePanelText
          title={
            <Trans>Payout Details</Trans>
          }
          description={(
            data.details?.id == null
              ? <Trans>Enter your payout details</Trans>
              : <Trans>Update your payout details</Trans>
          )}
        />
      </PagePanelWrap>
    </Stack>
  )
}
