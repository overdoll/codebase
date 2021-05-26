/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks'
import { Button, Form, Input, useForm } from '@//:modules/form'
import { Center, Flex, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { RegisterMutation } from '@//:artifacts/RegisterMutation.graphql'
import type { Node } from 'react'
import { useHistory } from '@//:modules/routing'
import Icon from '@//:modules/content/icon/Icon'
import SignBadgeCircle from '@streamlinehq/streamlinehq/img/streamline-regular/sign-badge-circle-K1i3HA.svg'
import { Helmet } from 'react-helmet'

const RegisterMutationGQL = graphql`
  mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data)
  }
`

export default function Register (): Node {
  const [commit, isInFlight] = useMutation<RegisterMutation>(
    RegisterMutationGQL
  )
  const instance = useForm()
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
          <Form instance={instance} onSubmit={onSubmit}>
            <Input
              title={t('register.form.username.title')}
              placeholder={t('register.form.username.placeholder')}
              name='username'
              validation={{ required: true }}
              type='text'
            />
            <Button width='100%' type='submit' loading={isInFlight}>
              {t('register.form.submit')}
            </Button>
          </Form>
        </Flex>
      </Center>
    </>
  )
}
