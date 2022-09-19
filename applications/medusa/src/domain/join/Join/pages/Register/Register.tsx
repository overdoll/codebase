import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Flex, Link, Stack, Text } from '@chakra-ui/react'
import type { RegisterMutation } from '@//:artifacts/RegisterMutation.graphql'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import RegisterForm from './RegisterForm/RegisterForm'
import type { RegisterFragment$key } from '@//:artifacts/RegisterFragment.graphql'
import { t, Trans } from '@lingui/macro'
import translateValidation from '@//:modules/validation/translateValidation'
import { useFlash } from '@//:modules/flash'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import { COMMUNITY_GUIDELINES, PRIVACY_POLICY, TERMS_OF_SERVICE } from '@//:modules/constants/links'
import Head from 'next/head'
import RevokeTokenButton from '../../components/RevokeTokenButton/RevokeTokenButton'
import { OverdollLogo } from '@//:assets/logos'
import useGrantCleanup from '../../support/useGrantCleanup'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'
import { StringParam, useQueryParam } from 'use-query-params'

interface Props {
  queryRef: RegisterFragment$key
}

const RegisterMutationGQL = graphql`
  mutation RegisterMutation($input: CreateAccountWithAuthenticationTokenInput!) {
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

const RegisterFragment = graphql`
  fragment RegisterFragment on AuthenticationToken {
    id
    token
    ...RevokeTokenButtonFragment
  }
`

export default function Register ({ queryRef }: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<RegisterMutation>(
    RegisterMutationGQL
  )

  const data = useFragment(RegisterFragment, queryRef)

  const [from] = useQueryParam<string | null | undefined>('redirect', StringParam)

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
        if (from == null) {
          // track generic registration
          trackFathomEvent('AJ0MJENF', 1)
        } else if (from === 'post_like_button') {
          // track registration as a result of the post like button
          trackFathomEvent('AUYW3TCY', 1)
        } else if (from === 'club_join_button') {
          // track registration as a result of the club join button
          trackFathomEvent('FOEECN69', 1)
        } else if (from === 'club_join_button') {
          // track registration as a result of the navigation join popup
          trackFathomEvent('5JHI3XGE', 1)
        }
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
      <Flex w='100%' justify='center' align='center' h='100%' position='relative'>
        <Flex top={0} position='absolute' w='100%' justify='flex-end'>
          <RevokeTokenButton queryRef={data} />
        </Flex>
        <Stack spacing={6}>
          <Icon
            icon={OverdollLogo}
            w={32}
            h={32}
            fill='green.300'
          />
          <RegisterForm
            onSubmit={onSubmit}
            loading={isInFlight}
          />
          <Text color='gray.200' fontSize='sm'>
            <Trans>
              Creating an account on overdoll means you agree to follow our{' '}
              <Link
                color='gray.100'
                fontSize='inherit'
                isExternal
                href={COMMUNITY_GUIDELINES}
              >Community Guidelines
              </Link>{' '}
              and understand both our{' '}
              <Link
                color='gray.100'
                fontSize='inherit'
                isExternal
                href={TERMS_OF_SERVICE}
              >Terms of Service
              </Link>{' '} and {' '}
              <Link
                color='gray.100'
                fontSize='inherit'
                isExternal
                href={PRIVACY_POLICY}
              >Privacy Policy
              </Link>, which also stipulate you must be at least 18 years of age to register.
            </Trans>
          </Text>
        </Stack>
      </Flex>
    </>
  )
}
