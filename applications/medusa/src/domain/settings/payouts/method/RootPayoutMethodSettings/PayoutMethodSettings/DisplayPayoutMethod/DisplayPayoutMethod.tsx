import { graphql, useFragment } from 'react-relay/hooks'
import type { DisplayPayoutMethodFragment$key } from '@//:artifacts/DisplayPayoutMethodFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import PayoutMethod from './PayoutMethod/PayoutMethod'

interface Props {
  query: DisplayPayoutMethodFragment$key
}

const Fragment = graphql`
  fragment DisplayPayoutMethodFragment on Account {
    payoutMethod {
      ...PayoutMethodFragment
    }
  }
`

export default function DisplayPayoutMethod ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <LargeBackgroundBox>
      <Stack spacing={2}>
        <Heading fontSize='lg' color='gray.00'>
          <Trans>
            Your Payout Method
          </Trans>
        </Heading>
        <PayoutMethod query={data.payoutMethod} />
      </Stack>
    </LargeBackgroundBox>
  )
}
