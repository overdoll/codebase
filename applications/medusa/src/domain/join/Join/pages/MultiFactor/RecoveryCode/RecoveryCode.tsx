import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { HStack, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { prepareViewer } from '../../../support/support'
import { RecoveryCodeMutation } from '@//:artifacts/RecoveryCodeMutation.graphql'
import { RecoveryCodeFragment$key } from '@//:artifacts/RecoveryCodeFragment.graphql'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import translateValidation from '@//:modules/validation/translateValidation'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFooter,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { StringParam, useQueryParam } from 'use-query-params'
import { useRouter } from 'next/router'

interface CodeValues {
  code: string
}

interface Props {
  queryRef: RecoveryCodeFragment$key
}

const RecoveryCodeMutationGQL = graphql`
  mutation RecoveryCodeMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(input: $input) {
      validation
      account {
        id
      }
    }
  }
`

const RecoveryCodeFragment = graphql`
  fragment RecoveryCodeFragment on AuthenticationToken {
    token
  }
`

export default function RecoveryCode ({ queryRef }: Props): JSX.Element {
  const fragment = useFragment(RecoveryCodeFragment, queryRef)

  const [submitCode, isSubmittingCode] = useMutation<RecoveryCodeMutation>(
    RecoveryCodeMutationGQL
  )

  const [redirect] = useQueryParam<string | null | undefined>('redirect', StringParam)

  const { i18n } = useLingui()

  const schema = Joi.object({
    code: Joi
      .string()
      .alphanum()
      .length(8)
      .required()
      .messages({
        'string.empty': i18n._(t`Please enter a recovery code`),
        'string.length': i18n._(t`A recovery code must be 8 characters long`),
        'string.alphanum': i18n._(t`A recovery code can only contain numbers and letters`)
      })
  })

  const methods = useForm<CodeValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { setError } = methods

  const notify = useToast()

  const router = useRouter()

  const onSubmitCode = ({ code }: CodeValues): void => {
    submitCode({
      variables: {
        input: {
          token: fragment.token,
          recoveryCode: code
        }
      },
      onCompleted (data) {
        if (data?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.validation != null) {
          setError('code', {
            type: 'mutation',
            message: i18n._(translateValidation(data.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`A recovery code was successfully used up to log you in`
        })
        void router.push(redirect != null ? redirect : '/')
      },
      updater: (store, payload) => {
        const viewerPayload = store.getRootField('grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode').getLinkedRecord('account')

        prepareViewer(store, viewerPayload)
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error submitting a recovery code`
        })
      }
    })
  }

  return (
    <Stack spacing={3}>
      <Alert colorScheme='teal' status='info'>
        <AlertIcon />
        <AlertDescription
          align='center'
          lineHeight={5}
          fontSize='sm'
        >
          <Trans>
            If you lost access to your two-factor device, you can use one of the recovery codes you downloaded
            when you set up two-factor authentication.
          </Trans>
        </AlertDescription>
      </Alert>
      <Form {...methods} onSubmit={onSubmitCode}>
        <HStack spacing={2} justify='space-between'>
          <FormInput size='md' id='code'>
            <InputHeader>
              <Trans>
                Code
              </Trans>
            </InputHeader>
            <InputBody>
              <TextInput placeholder={i18n._(t`An 8-character recovery code`)} />
            </InputBody>
            <InputFooter />
          </FormInput>
          <FormSubmitButton
            size='md'
            variant='solid'
            colorScheme='gray'
            isLoading={isSubmittingCode}
          >
            <Trans>
              Submit
            </Trans>
          </FormSubmitButton>
        </HStack>
      </Form>
    </Stack>
  )
}
