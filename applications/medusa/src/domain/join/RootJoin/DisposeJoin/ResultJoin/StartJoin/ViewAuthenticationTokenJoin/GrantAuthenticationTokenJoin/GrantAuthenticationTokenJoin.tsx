import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Box, Heading, Spinner, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import type {
  GrantAuthenticationTokenJoinFragment$key
} from '@//:artifacts/GrantAuthenticationTokenJoinFragment.graphql'
import { GrantAuthenticationTokenJoinMutation } from '@//:artifacts/GrantAuthenticationTokenJoinMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import Head from 'next/head'
import useGrantCleanup from '../../support/useGrantCleanup'

interface Props {
  query: GrantAuthenticationTokenJoinFragment$key
}

const Mutation = graphql`
  mutation GrantAuthenticationTokenJoinMutation($input: GrantAccountAccessWithAuthenticationTokenInput!) {
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
        ...AccountIconFragment
      }
    }
  }
`

const Fragment = graphql`
  fragment GrantAuthenticationTokenJoinFragment on AuthenticationToken {
    id
    token
  }
`

export default function GrantAuthenticationTokenJoin (props: Props): JSX.Element {
  const { query } = props

  const [commit] = useMutation<GrantAuthenticationTokenJoinMutation>(Mutation)

  const data = useFragment(Fragment, query)

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
