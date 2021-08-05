/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect } from 'react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useTranslation } from 'react-i18next'
import { useHistory } from '@//:modules/routing'
import { Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { StringParam, useQueryParam } from 'use-query-params'
import { useFlash } from '@//:modules/flash'

const ConfirmationMutationGQL = graphql`
  mutation ConfirmationMutation($input: ConfirmAccountEmailInput!) {
    confirmAccountEmail(input: $input) {
      accountEmail {
        id
        email
        status
      }
    }
  }
`

export default function Confirmation (props: Props): Node {
  const [queryToken] = useQueryParam('id', StringParam)

  const [commit] = useMutation(
    ConfirmationMutationGQL
  )

  const [t] = useTranslation('confirmation')

  const history = useHistory()

  const { flash } = useFlash()

  const confirm = () => {
    commit({
      variables: {
        input: {
          id: queryToken
        }
      },
      updater: (store, payload) => {
        const data = payload.confirmAccountEmail

        if (!data.accountEmail) {
          flash('confirmation.error', t('error'))
          history.push('/settings/profile')
        }

        if (data.accountEmail) {
          flash('confirmation.success', t('success', { email: data.accountEmail.email }))
          history.push('/settings/profile')
        }
      },
      onError () {
        flash('confirmation.error', t('error'))
        history.push('/settings/profile')
      }
    })
  }

  useEffect(() => {
    confirm()
  }, [])

  return (
    <Flex mt={40} h='100%' align='center' justify='center' direction='column'>
      <Spinner mb={6} thickness={4} size='xl' color='red.500' />
      <Heading mb={1} size='md' color='gray.00'>{t('header')}</Heading>
      <Text size='sm' color='gray.100'>{t('subheader')}</Text>
    </Flex>
  )
}
