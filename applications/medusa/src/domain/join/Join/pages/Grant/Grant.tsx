import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Flex, Heading, Spinner, Text } from '@chakra-ui/react'
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
      account {
        id
        username
        isModerator
        isStaff
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
          prepareViewer(store, account)
          removeCookie('token')
          void router.push(redirect != null ? redirect : '/')
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
      <Flex
        mt={40}
        h='100%'
        align='center'
        justify='center'
        direction='column'
      >
        <Spinner
          mb={6}
          thickness='4px'
          w={20}
          h={20}
          color='primary.400'
        />
        <Heading
          mb={1}
          size='md'
          color='gray.00'
        >
          <Trans>
            Logging in
          </Trans>
        </Heading>
        <Text
          size='sm'
          color='gray.100'
        >
          <Trans>
            Please wait while we log you in...
          </Trans>
        </Text>
      </Flex>
    </>
  )
}