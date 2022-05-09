import { graphql, useFragment } from 'react-relay/hooks'
import { ClubPayoutMethodAlertFragment$key } from '@//:artifacts/ClubPayoutMethodAlertFragment.graphql'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { HStack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: ClubPayoutMethodAlertFragment$key
}

const Fragment = graphql`
  fragment ClubPayoutMethodAlertFragment on Club {
    owner {
      payoutMethod {
        __typename
      }
    }
  }
`

export default function ClubPayoutMethodAlert ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.owner.payoutMethod != null) return <></>

  return (
    <Alert status='warning'>
      <HStack justify='space-between'>
        <HStack>
          <AlertIcon />
          <AlertDescription>
            <Trans>
              You don't have any payout methods configured. You won't be able to receive any payouts.
            </Trans>
          </AlertDescription>
        </HStack>
        <LinkButton variant='solid' size='sm' colorScheme='orange' href='/settings/payouts'>
          <Trans>
            Configure
          </Trans>
        </LinkButton>
      </HStack>
    </Alert>
  )
}