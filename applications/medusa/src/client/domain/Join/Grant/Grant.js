/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks'
import { Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
import { useEffect } from 'react'
import { useHistory } from '@//:modules/routing'

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
  const [commit, isGrantingAccess] = useMutation(GrantAction)

  const notify = useToast()

  const [t] = useTranslation('auth')

  const history = useHistory()

  // grant account access
  useEffect(() => {
    if (!isGrantingAccess) {
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
            history.push('/join')
            return
          }
          notify({
            status: 'success',
            title: t('grant.success'),
            isClosable: true
          })
          history.push('/profile')
        },
        updater: (store, payload) => {
          // basically just invalidate the viewer so it can be re-fetched
          const viewer = store
            .getRoot()
            .getLinkedRecord('viewer')

          if (viewer != null) {
            viewer.invalidateRecord()
          }
        },
        onError (data) {
          console.log(data)
          notify({
            status: 'error',
            title: t('grant.error'),
            isClosable: true
          })
          history.push('/join')
        }
      })
    }
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
