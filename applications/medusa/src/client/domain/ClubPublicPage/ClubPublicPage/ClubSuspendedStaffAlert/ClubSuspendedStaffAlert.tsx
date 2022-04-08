import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubSuspendedStaffAlertFragment$key } from '@//:artifacts/ClubSuspendedStaffAlertFragment.graphql'
import Can from '@//:modules/authorization/Can'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { HStack } from '@chakra-ui/react'
import { useCountdown } from '@//:modules/hooks'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: ClubSuspendedStaffAlertFragment$key
}

const Fragment = graphql`
  fragment ClubSuspendedStaffAlertFragment on Club {
    slug
    suspension {
      expires
    }
  }
`

export default function ClubSuspendedStaffAlert ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    hasPassed,
    remaining
  } = useCountdown(data.suspension?.expires)

  return (
    <Can I='staff' a='Club'>
      {data.suspension != null && (
        <Alert mb={2} status='warning'>
          <HStack spacing={4} justify='space-between'>
            <HStack>
              <AlertIcon />
              <AlertDescription>
                <Trans>
                  This club is currently suspended. Only staff can see this page.
                </Trans>
                {' '}
                {hasPassed
                  ? (
                    <Trans>The owner can unlock the club.</Trans>)
                  : (
                    <Trans>
                      The suspension expires in {remaining}.
                    </Trans>
                    )}
              </AlertDescription>
            </HStack>
            <LinkButton
              size='sm'
              colorScheme='orange'
              variant='solid'
              to={`/staff/club/${data.slug}`}
            >
              <Trans>
                Manage
              </Trans>
            </LinkButton>
          </HStack>
        </Alert>)}
    </Can>
  )
}
