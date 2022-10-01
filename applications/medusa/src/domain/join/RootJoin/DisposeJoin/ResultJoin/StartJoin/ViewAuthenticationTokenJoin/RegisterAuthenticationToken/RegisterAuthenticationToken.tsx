import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Center, Flex, Grid, GridItem, Heading, Link, Stack, Text } from '@chakra-ui/react'
import type { RegisterAuthenticationTokenMutation } from '@//:artifacts/RegisterAuthenticationTokenMutation.graphql'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import type { RegisterAuthenticationTokenFragment$key } from '@//:artifacts/RegisterAuthenticationTokenFragment.graphql'
import { t, Trans } from '@lingui/macro'
import translateValidation from '@//:modules/validation/translateValidation'
import { useFlash } from '@//:modules/flash'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import { COMMUNITY_GUIDELINES, PRIVACY_POLICY, TERMS_OF_SERVICE } from '@//:modules/constants/links'
import Head from 'next/head'
import useGrantCleanup from '../../support/useGrantCleanup'
import RevokeViewAuthenticationTokenButton
  from '../../RevokeViewAuthenticationTokenButton/RevokeViewAuthenticationTokenButton'
import RegisterAuthenticationTokenForm from './RegisterAuthenticationTokenForm/RegisterAuthenticationTokenForm'
import { RegisterAccount } from '@//:assets/icons'

interface Props {
  query: RegisterAuthenticationTokenFragment$key
}

const Mutation = graphql`
  mutation RegisterAuthenticationTokenMutation($input: CreateAccountWithAuthenticationTokenInput!) {
    createAccountWithAuthenticationToken(input: $input) {
      revokedAuthenticationTokenId
      validation
      account {
        id
        username
        isModerator
        isStaff
        isArtist
        ...AccountIconFragment
      }
    }
  }
`

const Fragment = graphql`
  fragment RegisterAuthenticationTokenFragment on AuthenticationToken {
    id
    token
    ...RevokeViewAuthenticationTokenButtonFragment
  }
`

export default function RegisterAuthenticationToken (props: Props): JSX.Element {
  const { query } = props

  const [commit, isInFlight] = useMutation<RegisterAuthenticationTokenMutation>(
    Mutation
  )

  const data = useFragment(Fragment, query)

  const notify = useToast()

  const { i18n } = useLingui()

  const {
    successfulGrant,
    invalidateGrant
  } = useGrantCleanup()

  const { flash } = useFlash()

  const onSubmit = ({ username }): void => {
    commit({
      variables: {
        input: {
          username: username,
          token: data.token
        }
      },
      updater: (store, payload) => {
        if (payload?.createAccountWithAuthenticationToken?.validation === 'TOKEN_INVALID') {
          invalidateGrant(store, data.id)
        }

        if (payload.createAccountWithAuthenticationToken?.validation != null) {
          notify({
            status: 'error',
            title: i18n._(translateValidation(payload.createAccountWithAuthenticationToken.validation)),
            isClosable: true
          })
          return
        }
        const viewerPayload = store.getRootField('createAccountWithAuthenticationToken').getLinkedRecord('account')

        successfulGrant(store, viewerPayload, payload?.createAccountWithAuthenticationToken?.revokedAuthenticationTokenId)
        flash('new.account', '')

        notify({
          status: 'success',
          title: t`Welcome to overdoll!`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an issue with registration`,
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <Head>
        <title>Create your account - overdoll</title>
      </Head>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        <Grid w='100%' templateColumns='1fr 1fr 1fr'>
          <GridItem>
            <Flex h='100%' align='center'>
              <RevokeViewAuthenticationTokenButton query={data} />
            </Flex>
          </GridItem>
          <GridItem>
            <Center>
              <Icon
                icon={RegisterAccount}
                w={16}
                h={16}
                fill='gray.00'
              />
            </Center>
          </GridItem>
          <GridItem />
        </Grid>
        <Heading fontSize='4xl' color='gray.00'>
          <Trans>
            What should we call you?
          </Trans>
        </Heading>
        <RegisterAuthenticationTokenForm
          onSubmit={onSubmit}
          isLoading={isInFlight}
        />
        <Text color='whiteAlpha.300' fontSize='sm'>
          <Trans>
            Creating an account on overdoll means you agree to follow our{' '}
            <Link
              color='whiteAlpha.500'
              fontSize='inherit'
              isExternal
              href={COMMUNITY_GUIDELINES}
            >Community Guidelines
            </Link>{' '}
            and understand both our{' '}
            <Link
              color='whiteAlpha.500'
              fontSize='inherit'
              isExternal
              href={TERMS_OF_SERVICE}
            >Terms of Service
            </Link>{' '} and {' '}
            <Link
              color='whiteAlpha.500'
              fontSize='inherit'
              isExternal
              href={PRIVACY_POLICY}
            >Privacy Policy
            </Link>, which also stipulate you must be at least 18 years of age to register.
          </Trans>
        </Text>
      </Stack>
    </>
  )
}
