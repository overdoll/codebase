import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Heading, Spinner, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import type {
  GrantAuthenticationTokenJoinFragment$key
} from '@//:artifacts/GrantAuthenticationTokenJoinFragment.graphql'
import { GrantAuthenticationTokenJoinMutation } from '@//:artifacts/GrantAuthenticationTokenJoinMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import Head from 'next/head'
import useGrantCleanup from '../../support/useGrantCleanup'
import Button from '@//:modules/form/Button/Button'
import { SadError } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'

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
  const [hasError, setHasError] = useState(false)

  const data = useFragment(Fragment, query)

  const notify = useToast()

  const {
    successfulGrant,
    invalidateGrant
  } = useGrantCleanup()

  const onCommit = (): void => {
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
        setHasError(true)
      }
    })
  }

  const onRetry = (): void => {
    setHasError(false)
    onCommit()
  }

  // grant account access
  useEffect(() => {
    onCommit()
  }, [])

  if (hasError) {
    return (
      <>
        <Head>
          <title>Error - overdoll</title>
        </Head>
        <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
          <Icon
            icon={SadError}
            w={16}
            h={16}
            fill='gray.00'
          />
          <Heading fontSize='4xl' color='gray.00'>
            <Trans>
              There was an error logging you in.
            </Trans>
          </Heading>
          <Button
            onClick={onRetry}
            size='xl'
            colorScheme='primary'
            variant='solid'
          >
            <Trans>
              Retry
            </Trans>
          </Button>
        </Stack>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Logging you in - overdoll</title>
      </Head>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        <Spinner thickness='6px' color='gray.00' w={16} h={16} />
        <Heading fontSize='4xl' color='gray.00'>
          <Trans>
            Just a few seconds for us to log you in.
          </Trans>
        </Heading>
      </Stack>
    </>
  )
}
