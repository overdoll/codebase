/**
 * @flow
 */
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { Node } from 'react'
import { useEffect } from 'react'
import { useHistory } from '@//:modules/routing'
import prepareViewer from '@//:modules/utilities/functions/prepareViewer/prepareViewer'
import type { GrantFragment$key } from '@//:artifacts/GrantFragment.graphql'
import { useCookies } from 'react-cookie'

type Props = {
  queryRef: GrantFragment$key,
}

const GrantAction = graphql`
  mutation GrantMutation($input: GrantAccountAccessWithAuthenticationTokenInput!) {
    grantAccountAccessWithAuthenticationToken(input: $input) {
      validation
      account {
        id
      }
    }
  }
`

const GrantFragment = graphql`
  fragment GrantFragment on AuthenticationToken {
    id
    token
  }
`

export default function Grant ({ queryRef }: Props): Node {
  const [commit] = useMutation(GrantAction)

  const data = useFragment(GrantFragment, queryRef)

  const notify = useToast()

  const [t] = useTranslation('auth')

  const [, , removeCookie] = useCookies(['token'])

  const history = useHistory()

  // grant account access
  useEffect(() => {
    commit({
      variables: {
        input: {
          token: data.token
        }
      },
      onCompleted (data) {
        // If there's an error with the token, bring user back to login page
        if (data.grantAccountAccessWithAuthenticationToken.validation) {
          notify({
            status: 'error',
            title: data.grantAccountAccessWithAuthenticationToken.validation,
            isClosable: true
          })
          return
        }
        notify({
          status: 'success',
          title: t('grant.success'),
          isClosable: true
        })
      },
      updater: (store) => {
        const payload = store.getRootField('grantAccountAccessWithAuthenticationToken').getLinkedRecord('account')
        prepareViewer(store, payload)
        store.delete(data.id)
        removeCookie('token')
        history.push(key, value)
      },
      onError (data) {
        console.log(data)
        notify({
          status: 'error',
          title: t('grant.error'),
          isClosable: true
        })
      }
    })
  }, [])

  // Ask user to authenticate
  return (
    <Flex
      mt={40}
      h='100%'
      align='center'
      justify='center'
      direction='column'
    >
      <Spinner
        mb={6}
        thickness={4}
        size='xl'
        color='primary.500'
      />
      <Heading
        mb={1}
        size='md'
        color='gray.00'
      >{t('grant.header')}
      </Heading>
      <Text
        size='sm'
        color='gray.100'
      >{t('grant.subheader')}
      </Text>
    </Flex>
  )
}
