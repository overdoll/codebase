/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import type { RegisterMutation } from '@//:artifacts/RegisterMutation.graphql';
import type { Node } from 'react';
import { useHistory } from '@//:modules/routing';
import Icon from '@//:modules/content/Icon/Icon';
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg';
import { Helmet } from 'react-helmet-async';
import RegisterForm from './RegisterForm/RegisterForm';
import { PageWrapper } from '@//:modules/content/PageLayout';

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
        input: {
          username: val.username
        }
      },
      updater: (store, payload) => {
        if (payload.createAccountWithAuthenticationToken.validation) {
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

        history.push('/profile')
        notify({
          status: 'success',
          title: t('register.success'),
          isClosable: true
        })
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
      <PageWrapper>
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
      </PageWrapper>
    </>
  )
}
