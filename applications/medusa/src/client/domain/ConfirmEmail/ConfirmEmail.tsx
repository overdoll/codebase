import { useEffect } from 'react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useHistory } from '@//:modules/routing'
import { Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { useQueryParam } from 'use-query-params'
import { useFlash } from '@//:modules/flash'
import { ConfirmEmailMutation } from '@//:artifacts/ConfirmEmailMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { Helmet } from 'react-helmet-async'

const ConfirmEmailMutationGQL = graphql`
  mutation ConfirmEmailMutation($input: ConfirmAccountEmailInput!) {
    confirmAccountEmail(input: $input) {
      accountEmail {
        id
        email
        status
      }
    }
  }
`

export default function ConfirmEmail (): JSX.Element {
  const [queryToken] = useQueryParam<string>('id')
  const [querySecret] = useQueryParam<string>('secret')

  const [commit] = useMutation<ConfirmEmailMutation>(
    ConfirmEmailMutationGQL
  )

  const history = useHistory()

  const { flash } = useFlash()

  const confirm = (): void => {
    commit({
      variables: {
        input: {
          id: queryToken,
          secret: querySecret
        }
      },
      updater: (store, payload) => {
        const data = payload.confirmAccountEmail

        if (data != null) {
          if (data.accountEmail == null) {
            flash('confirmation.error', t`This confirmation link is either invalid or has expired`)
            history.push('/settings/profile/emails')
          } else {
            flash('confirmation.success', t`${data.accountEmail.email} was confirmed successfully`)
            history.push('/settings/profile/emails')
          }
        }
      },
      onError () {
        flash('confirmation.error', t`This confirmation link is either invalid or has expired`)
        history.push('/settings/profile/emails')
      }
    })
  }

  useEffect(() => {
    confirm()
  }, [])

  return (
    <>
      <Helmet>
        <title>
          Confirming Email... :: overdoll
        </title>
      </Helmet>
      <Flex
        mt={40}
        h='100%'
        align='center'
        justify='center'
        direction='column'
      >
        <Spinner
          mb={6}
          thickness='4'
          size='xl'
          color='primary.500'
        />
        <Heading
          mb={1}
          size='md'
          color='gray.00'
        >
          <Trans>
            Confirming Email
          </Trans>
        </Heading>
        <Text
          size='sm'
          color='gray.100'
        >
          <Trans>
            Please wait while we confirm your email...
          </Trans>
        </Text>
      </Flex>
    </>
  )
}
