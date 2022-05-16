import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Box, Heading, Spinner, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { prepareViewer } from '../../support/support'
import type { GrantFragment$key } from '@//:artifacts/GrantFragment.graphql'
import { useCookies } from 'react-cookie'
import { GrantMutation } from '@//:artifacts/GrantMutation.graphql'
import { t, Trans } from '@lingui/macro'
import translateValidation from '@//:modules/validation/translateValidation'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import Head from 'next/head'
import { StringParam, useQueryParam } from 'use-query-params'
import { useRouter } from 'next/router'

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
        username
        isModerator
        isStaff
        isArtist
        deleting {
          __typename
        }
        lock {
          __typename
        }
        avatar {
          ...ResourceIconFragment
          ...ResourceItemFragment
        }
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

  const [redirect] = useQueryParam<string | null | undefined>('redirect', StringParam)

  const data = useFragment(GrantFragment, queryRef)

  const notify = useToast()

  const { i18n } = useLingui()

  const [, , removeCookie] = useCookies(['token'])

  const router = useRouter()

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

        // If there's an error with the token, bring user back to login page
        if (data.grantAccountAccessWithAuthenticationToken.validation != null) {
          notify({
            status: 'error',
            title: i18n._(translateValidation(data.grantAccountAccessWithAuthenticationToken.validation))
          })
          removeCookie('token')
          return
        }
        notify({
          status: 'success',
          title: t`Welcome back!`
        })
      },
      updater: (store, payload) => {
        if (payload?.grantAccountAccessWithAuthenticationToken?.account?.id != null) {
          const account = store.get(payload?.grantAccountAccessWithAuthenticationToken?.account?.id)
          store.get(payload?.grantAccountAccessWithAuthenticationToken?.revokedAuthenticationTokenId)?.invalidateRecord()
          prepareViewer(store, account)
          void router.push(redirect != null ? redirect : '/').then(() => {
            removeCookie('token')
          })
        }
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
        <title>Logging In... :: overdoll</title>
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
