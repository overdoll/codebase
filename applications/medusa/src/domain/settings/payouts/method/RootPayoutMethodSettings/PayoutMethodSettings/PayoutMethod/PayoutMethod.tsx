import { graphql, useFragment } from 'react-relay/hooks'
import type { PayoutMethodFragment$key } from '@//:artifacts/PayoutMethodFragment.graphql'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { PaxumLogo } from '@//:assets/logos'
import { Icon } from '@//:modules/content/PageLayout'

interface Props {
  query: PayoutMethodFragment$key | null
}

const Fragment = graphql`
  fragment PayoutMethodFragment on AccountPayoutMethod {
    __typename
    ...on AccountPaxumPayoutMethod {
      id
      email
    }
  }
`

export default function PayoutMethod ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data == null) {
    return <></>
  }

  switch (data.__typename) {
    case 'AccountPaxumPayoutMethod':
      return (
        <HStack align='flex-start' justify='space-between'>
          <Stack spacing={1}>
            <HStack>
              <Heading fontSize='sm' color='gray.100'>
                <Trans>
                  Payout Method
                </Trans>
              </Heading>
              <Heading fontSize='sm' color='gray.200'>
                Paxum
              </Heading>
            </HStack>
            <HStack>
              <Heading fontSize='sm' color='gray.100'>
                <Trans>
                  Email
                </Trans>
              </Heading>
              <Heading fontSize='sm' color='gray.200'>
                {data.email}
              </Heading>
            </HStack>
          </Stack>
          <Icon icon={PaxumLogo} h={4} />
        </HStack>
      )
    default:
      return <></>
  }
}
