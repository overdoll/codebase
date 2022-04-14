import { useEffect } from 'react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useHistory } from '@//:modules/routing'
import { Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { useQueryParam } from 'use-query-params'
import { useFlash } from '@//:modules/flash'
import { ConfirmEmailMutation } from '@//:artifacts/ConfirmEmailMutation.graphql'
import { t, Trans } from '@lingui/macro'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'

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

const ConfirmEmail: PageProps<{}> = (): JSX.Element => {
  const [queryToken] = useQueryParam<string>('id')
  const [querySecret] = useQueryParam<string>('secret')

  const [commit] = useMutation<ConfirmEmailMutation>(
    ConfirmEmailMutationGQL
  )

  const router = useRouter()

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
            void router.push('/settings/profile/emails')
          } else {
            flash('confirmation.success', t`${data.accountEmail.email} was confirmed successfully`)
            void router.push('/settings/profile/emails')
          }
        }
      },
      onError () {
        flash('confirmation.error', t`This confirmation link is either invalid or has expired`)
        void router.push('/settings/profile/emails')
      }
    })
  }

  useEffect(() => {
    confirm()
  }, [])

  return (
    <>
      <Head>
        <title>
          Confirming Email... :: overdoll
        </title>
      </Head>
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

export default ConfirmEmail
