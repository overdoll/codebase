import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Box, Heading, Spinner, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import type { GrantFragment$key } from '@//:artifacts/GrantFragment.graphql'
import { GrantMutation } from '@//:artifacts/GrantMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import Head from 'next/head'
import useGrantCleanup from '../../support/useGrantCleanup'
import posthog from 'posthog-js'
import * as Sentry from '@sentry/nextjs'

interface Props {
  queryRef: GrantFragment$key
}

const GrantAction = graphql`
  mutation GrantMutation($input: GrantAccountAccessWithAuthenticationTokenInput!) {
    grantAccountAccessWithAuthenticationToken(input: $input) {
      validation
      revokedAuthenticationTokenId
      account {
        id
        reference
        username
        isModerator
        isStaff
        isArtist
        isWorker
        deleting {
          __typename
        }
        lock {
          __typename
        }
        ...AccountIconFragment
      }
    }
  }
`

const GrantFragment = graphql`
  fragment GrantFragment on AuthenticationToken {
    id
    token
  }
`

export default function Grant ({ queryRef }: Props): JSX.Element {
  const [commit] = useMutation<GrantMutation>(GrantAction)

  const data = useFragment(GrantFragment, queryRef)

  const notify = useToast()

  const {
    successfulGrant,
    invalidateGrant
  } = useGrantCleanup()

  // grant account access
  useEffect(() => {
    commit({
      variables: {
        input: {
          token: data.token
        }
      },
      onCompleted (data) {
        if (data.grantAccountAccessWithAuthenticationToken == null) {
          return
        }
        if (data.grantAccountAccessWithAuthenticationToken.validation != null) {
          return
        }
        const accountData = data?.grantAccountAccessWithAuthenticationToken?.account

        // identify user in posthog
        posthog.identify(accountData?.reference, {
          isStaff: accountData?.isStaff,
          isArtist: accountData?.isArtist,
          isModerator: accountData?.isModerator,
          isWorker: accountData?.isWorker,
          username: accountData?.username
        })

        // identify user in sentry
        Sentry.setUser({
          username: accountData?.username,
          id: accountData?.reference
        })

        if (accountData != null && (accountData.isStaff || accountData.isWorker)) {
          posthog.opt_out_capturing()
        }

        notify({
          status: 'success',
          title: t`Welcome back!`
        })
      },
      updater: (store, payload) => {
        if (payload?.grantAccountAccessWithAuthenticationToken?.validation != null) {
          invalidateGrant(store, data.id)
          return
        }
        if (payload?.grantAccountAccessWithAuthenticationToken?.revokedAuthenticationTokenId == null) return
        const viewerPayload = store.getRootField('grantAccountAccessWithAuthenticationToken').getLinkedRecord('account')
        successfulGrant(store, viewerPayload, payload.grantAccountAccessWithAuthenticationToken.revokedAuthenticationTokenId)
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error logging you in`
        })
      }
    })
  }, [])

  // Ask user to authenticate
  return (
    <>
      <Head>
        <title>Logging you in - overdoll</title>
      </Head>
      <Stack align='center' justify='center' h='100%' spacing={6}>
        <Spinner
          thickness='6px'
          w={16}
          h={16}
          color='primary.400'
        />
        <Box>
          <Heading
            textAlign='center'
            fontSize='xl'
            color='gray.00'
            mb={1}
          >
            <Trans>
              Logging in
            </Trans>
          </Heading>
          <Heading textAlign='center' color='gray.300' fontSize='sm'>
            <Trans>
              Please wait while we log you in...
            </Trans>
          </Heading>
        </Box>
      </Stack>
    </>
  )
}
