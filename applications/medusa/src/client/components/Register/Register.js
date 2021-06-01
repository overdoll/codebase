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
import SignBadgeCircle from '@streamlinehq/streamlinehq/img/streamline-regular/sign-badge-circle-K1i3HA.svg'
import { Helmet } from 'react-helmet-async'
import RegisterForm from './RegisterForm'

const RegisterMutationGQL = graphql`
  mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data)
  }
`

export default function Register (): Node {
  const [commit, isInFlight] = useMutation<RegisterMutation>(
    RegisterMutationGQL
  )

  const notify = useToast()
  const [t] = useTranslation('auth')

  const history = useHistory()

  const onSubmit = val => {
    commit({
      variables: {
        data: {
          username: val.username
        }
      },
      onCompleted (data) {
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
      <Center mt={8}>
        <Flex w={['fill', 'sm']} direction='column'>
          <Icon
            icon={SignBadgeCircle}
            w={100}
            h={100}
            ml='auto'
            mr='auto'
            mb={5}
          />
          <RegisterForm onSubmit={onSubmit} loading={isInFlight} />
        </Flex>
      </Center>
    </>
  )
}
