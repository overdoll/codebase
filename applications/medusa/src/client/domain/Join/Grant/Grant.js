/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks'
import { Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useHistory } from '@//:modules/routing'
import PrepareViewer from '../helpers/PrepareViewer'
import type { Node } from 'react'

const GrantAction = graphql`
  mutation GrantMutation {
    grantAccountAccessWithAuthenticationToken {
      validation
      account {
        id
      }
    }
  }
`

export default function Grant (): Node {
  const [commit] = useMutation(GrantAction)

  const notify = useToast()

  const [t] = useTranslation('auth')

  const history = useHistory()

  // grant account access
  useEffect(() => {
    commit({
      variables: {},
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
        PrepareViewer(store, payload)
        history.push('/profile')
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
    <Flex mt={40} h='100%' align='center' justify='center' direction='column'>
      <Spinner mb={6} thickness={4} size='xl' color='primary.500' />
      <Heading mb={1} size='md' color='gray.00'>{t('grant.header')}</Heading>
      <Text size='sm' color='gray.100'>{t('grant.subheader')}</Text>
    </Flex>
  )
}
