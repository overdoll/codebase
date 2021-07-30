/**
 * @flow
 */
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useTranslation } from 'react-i18next'
import { Alert, AlertDescription, AlertIcon, Center, CloseButton, Flex, useToast } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import Icon from '@//:modules/content/Icon/Icon'
import JoinForm from './JoinForm/JoinForm'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import type { JoinFragment$key } from '@//:artifacts/JoinFragment.graphql'

type Props = {
  queryRef: JoinFragment$key,
  hadGrant: boolean,
  clearGrant: () => void,
}

const JoinAction = graphql`
  mutation JoinMutation($input: GrantAuthenticationTokenInput!) {
    grantAuthenticationToken(input: $input) {
      authenticationToken {
        id
        email
        sameSession
      }
    }
  }
`

const JoinFragment = graphql`
  fragment JoinFragment on AuthenticationToken {
    email
  }
`

export default function Join ({ queryRef, hadGrant, clearGrant }: Props): Node {
  const [commit, isInFlight] = useMutation(JoinAction)

  const data = useFragment(JoinFragment, queryRef)

  const [t] = useTranslation('auth')

  const notify = useToast()

  const onSubmit = (val) => {
    commit({
      variables: {
        input: {
          email: val.email
        }
      },
      updater: (store, payload) => {
        // after the mutation, update the root 'viewAuthenticationToken' so that the query can start the lobby queries
        const node = store.create(`client:root:viewAuthenticationToken-${payload.grantAuthenticationToken.authenticationToken.id}`, 'AuthenticationToken')
        node.setValue(payload.grantAuthenticationToken.authenticationToken.email, 'email')
        node.setValue(payload.grantAuthenticationToken.authenticationToken.id, 'id')
        node.setValue(payload.grantAuthenticationToken.authenticationToken.sameSession, 'sameSession')

        store
          .getRoot()
          .setLinkedRecord(node, 'viewAuthenticationToken')
      },
      onError (data) {
        console.log(data)
        notify({
          status: 'error',
          title: t('authenticate.error.join'),
          isClosable: true
        })
      }
    })
  }

  // Ask user to authenticate
  return (
    <>
      <Helmet title='join' />
      <Center mt={40}>
        <Flex w={['sm', 'md']} direction='column' align='center'>
          <Icon
            icon={SignBadgeCircle}
            w={100}
            h={100}
            color='red.500'
            ml='auto'
            mr='auto'
            mb={8}
          />
          {(!data && hadGrant) && (
            <Alert mb={2} status='error'>
              <AlertIcon />
              <AlertDescription>{t('expired')}</AlertDescription>
              <CloseButton
                position='absolute'
                right={2}
                top={2}
                onClick={clearGrant}
              />
            </Alert>
          )}
          <JoinForm
            onSubmit={onSubmit}
            loading={isInFlight}
          />
        </Flex>
      </Center>
    </>
  )
}
