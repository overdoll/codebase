import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@chakra-ui/react'
import type { RegisterMutation } from '@//:artifacts/RegisterMutation.graphql'
import { useHistory } from '@//:modules/routing'
import Icon from '@//:modules/content/Icon/Icon'
import { Helmet } from 'react-helmet-async'
import RegisterForm from './RegisterForm/RegisterForm'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { BadgeCircle } from '@//:assets/icons/navigation'
import type { RegisterFragment$key } from '@//:artifacts/RegisterFragment.graphql'
import { useCookies } from 'react-cookie'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

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
    id
    token
  }
`

export default function Register ({ queryRef }: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<RegisterMutation>(
    RegisterMutationGQL
  )

  const data = useFragment(RegisterFragment, queryRef)

  const notify = useToast()

  const [, , removeCookie] = useCookies<string>(['token'])

  const history = useHistory()

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
            title: payload.createAccountWithAuthenticationToken.validation,
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

        removeCookie('token')
        history.push('/profile')

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
      <Helmet title='register' />
      <PageWrapper>
        <Icon
          icon={BadgeCircle}
          w={100}
          h={100}
          fill='green.500'
          ml='auto'
          mr='auto'
          mb={8}
        />
        <RegisterForm
          onSubmit={onSubmit}
          loading={isInFlight}
        />
      </PageWrapper>
    </>
  )
}
