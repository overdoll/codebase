import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Link, Stack, Text } from '@chakra-ui/react'
import type { RegisterMutation } from '@//:artifacts/RegisterMutation.graphql'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import RegisterForm from './RegisterForm/RegisterForm'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { BadgeCircle } from '@//:assets/icons/navigation'
import type { RegisterFragment$key } from '@//:artifacts/RegisterFragment.graphql'
import { useCookies } from 'react-cookie'
import { t, Trans } from '@lingui/macro'
import translateValidation from '@//:modules/validation/translateValidation'
import { useFlash } from '@//:modules/flash'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import { COMMUNITY_GUIDELINES, PRIVACY_POLICY, TERMS_OF_SERVICE } from '@//:modules/constants/links'
import Head from 'next/head'
import { StringParam, useQueryParam } from 'use-query-params'
import { useRouter } from 'next/router'

interface Props {
  queryRef: RegisterFragment$key
}

const RegisterMutationGQL = graphql`
  mutation RegisterMutation($input: CreateAccountWithAuthenticationTokenInput!) {
    createAccountWithAuthenticationToken(input: $input) {
      validation
      account {
        id
      }
    }
  }
`

const RegisterFragment = graphql`
  fragment RegisterFragment on AuthenticationToken {
    token
  }
`

export default function Register ({ queryRef }: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<RegisterMutation>(
    RegisterMutationGQL
  )

  const data = useFragment(RegisterFragment, queryRef)

  const [redirect] = useQueryParam<string | null | undefined>('redirect', StringParam)

  const notify = useToast()

  const { i18n } = useLingui()

  const [, , removeCookie] = useCookies<string>(['token'])

  const router = useRouter()

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
        if (payload.createAccountWithAuthenticationToken?.validation != null) {
          notify({
            status: 'error',
            title: i18n._(translateValidation(payload.createAccountWithAuthenticationToken.validation)),
            isClosable: true
          })
          return
        }

        // basically just invalidate the viewer so it can be re-fetched
        const viewer = store
          .getRoot()
          .getLinkedRecord('viewer')

        if (viewer !== null) {
          viewer.invalidateRecord()
        }
        flash('new.account', '')
        removeCookie('token')
        void router.push(redirect != null ? redirect : '/')

        notify({
          status: 'success',
          title: t`Welcome to overdoll!`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an issue with registration.`,
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <Head>
        <title>Create Your Account :: overdoll</title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          <Icon
            icon={BadgeCircle}
            w={100}
            h={100}
            fill='green.500'
            ml='auto'
            mr='auto'
          />
          <Stack spacing={2}>
            <RegisterForm
              onSubmit={onSubmit}
              loading={isInFlight}
            />
            <Text color='gray.200' fontSize='lg'>
              <Trans>
                Creating an account on overdoll means you agree to follow our{' '}
                <Link
                  color='gray.100'
                  fontSize='lg'
                  isExternal
                  href={COMMUNITY_GUIDELINES}
                >Community Guidelines
                </Link>{' '}
                and understand our{' '}
                <Link
                  color='gray.100'
                  fontSize='lg'
                  isExternal
                  href={TERMS_OF_SERVICE}
                >Terms of Service
                </Link>{' '} and {' '}
                <Link
                  color='gray.100'
                  fontSize='lg'
                  isExternal
                  href={PRIVACY_POLICY}
                >Privacy Policy
                </Link>.
              </Trans>
            </Text>
          </Stack>
        </Stack>
      </PageWrapper>
    </>
  )
}
