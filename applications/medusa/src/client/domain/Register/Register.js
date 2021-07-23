/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks'
import { Center, Flex, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { RegisterMutation } from '@//:artifacts/RegisterMutation.graphql'
import type { Node } from 'react'
import { useHistory } from '@//:modules/routing'
import Icon from '@//:modules/content/icon/Icon'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { Helmet } from 'react-helmet-async'
import RegisterForm from './RegisterForm/RegisterForm'
import { useContext } from 'react'
import { RootContext } from '../Root/Root'

const RegisterMutationGQL = graphql`
  mutation RegisterMutation($input: CreateAccountWithAuthenticationTokenInput!) {
    createAccountWithAuthenticationToken(input: $input) {
      account {
        username
        isStaff
        isArtist
        isModerator
        avatar
      }
    }
  }
`

export default function Register (): Node {
  const [commit, isInFlight] = useMutation<RegisterMutation>(
    RegisterMutationGQL
  )

  const notify = useToast()
  const [t] = useTranslation('auth')

  const root = useContext(RootContext)

  const history = useHistory()

  const onSubmit = val => {
    commit({
      variables: {
        data: {
          username: val.username
        }
      },
      onCompleted (data) {
        root.fetchAccount()
        history.replace('/profile')
      },
      onError (data) {
        notify({
          status: 'error',
          title: t('register.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <Helmet title='register' />
      <Center mt={40}>
        <Flex w={['sm', 'md']} direction='column' align='center'>
          <Icon
            icon={SignBadgeCircle}
            w={100}
            h={100}
            color='green.500'
            ml='auto'
            mr='auto'
            mb={8}
          />
          <RegisterForm onSubmit={onSubmit} loading={isInFlight} />
        </Flex>
      </Center>
    </>
  )
}
