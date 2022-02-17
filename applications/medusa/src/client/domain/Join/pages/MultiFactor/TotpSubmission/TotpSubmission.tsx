import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { BadgeCircle } from '@//:assets/icons/navigation'
import { useHistory } from '@//:modules/routing'
import { prepareViewer } from '../../../helpers/support'
import type { TotpSubmissionFragment$key } from '@//:artifacts/TotpSubmissionFragment.graphql'
import { TotpSubmissionMutation } from '@//:artifacts/TotpSubmissionMutation.graphql'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import Totp from '@//:modules/validation/Totp'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import translateValidation from '@//:modules/validation/translateValidation'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'

interface CodeValues {
  code: string
}

interface Props {
  queryRef: TotpSubmissionFragment$key
}

const Fragment = graphql`
  fragment TotpSubmissionFragment on AuthenticationToken {
    token
  }
`

const Mutation = graphql`
  mutation TotpSubmissionMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(input: $input) {
      validation
      account {
        id
      }
    }
  }
`

export default function TotpSubmission ({ queryRef }: Props): JSX.Element {
  const data = useFragment(Fragment, queryRef)

  const [submitTotp, isSubmittingTotp] = useMutation<TotpSubmissionMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    code: Totp()
  })

  const methods = useForm<CodeValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { setError } = methods

  const notify = useToast()

  const history = useHistory()

  const onSubmitTotp = (formData): void => {
    submitTotp({
      variables: {
        input: {
          code: formData.code,
          token: data.token
        }
      },
      onCompleted (data) {
        if (data?.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp?.validation != null) {
          setError('code', {
            type: 'mutation',
            message: i18n._(translateValidation(data.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Welcome back! Thanks for using two-factor to log in!`
        })
      },
      updater: (store) => {
        history.push('/')
        const payload = store.getRootField('grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp').getLinkedRecord('account')
        prepareViewer(store, payload)
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error submitting the authentication code`
        })
      }
    })
  }

  return (
    <>
      <Box>
        <Icon
          icon={BadgeCircle}
          w={100}
          h={100}
          fill='primary.500'
          ml='auto'
          mr='auto'
          mb={8}
        />
        <Heading
          align='center'
          fontSize='xl'
          color='gray.00'
        >
          <Trans>
            Enter the 6-digit code from your Authenticator app
          </Trans>
        </Heading>
        <Text
          align='center'
          fontSize='sm'
          color='gray.200'
        >
          <Trans>
            You can find this in the same app you used to set up two-factor authentication
          </Trans>
        </Text>
      </Box>
      <Form {...methods} onSubmit={onSubmitTotp}>
        <Stack spacing={3}>
          <FormInput size='xl' id='code'>
            <InputHeader>
              <Trans>
                Code
              </Trans>
            </InputHeader>
            <InputBody>
              <TextInput placeholder='123456' />
            </InputBody>
          </FormInput>
          <FormSubmitButton
            size='xl'
            variant='outline'
            colorScheme='primary'
            isLoading={isSubmittingTotp}
          >
            <Trans>
              Submit Code
            </Trans>
          </FormSubmitButton>
        </Stack>
      </Form>
    </>
  )
}
