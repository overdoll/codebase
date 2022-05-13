import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { prepareViewer } from '../../../support/support'
import { RecoveryCodeMutation } from '@//:artifacts/RecoveryCodeMutation.graphql'
import { RecoveryCodeFragment$key } from '@//:artifacts/RecoveryCodeFragment.graphql'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import translateValidation from '@//:modules/validation/translateValidation'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { StringParam, useQueryParam } from 'use-query-params'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import Icon from '../../../../../../modules/content/PageLayout/Flair/Icon/Icon'
import { Barcode } from '@//:assets/icons'

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
        username
        isModerator
        isStaff
        isArtist
        deleting {
          __typename
        }
        lock {
          __typename
        }
        avatar {
          ...ResourceIconFragment
          ...ResourceItemFragment
        }
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

  const [, , removeCookie] = useCookies<string>(['token'])

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
      },
      updater: (store, payload) => {
        if (payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.account?.id != null) {
          const account = store.get(payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.account?.id)
          prepareViewer(store, account)
          removeCookie('token')
          void router.push(redirect != null ? redirect : '/')
        }
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
    <>
      <Icon
        icon={Barcode}
        w={16}
        h={16}
        fill='primary.400'
      />
      <Box>
        <Heading
          textAlign='center'
          fontSize='xl'
          color='gray.00'
          mb={1}
        >
          <Trans>
            Enter an 8-character recovery code
          </Trans>
        </Heading>
        <Heading textAlign='center' color='gray.300' fontSize='sm'>
          <Trans>
            If you lost access to your two-factor device, you can use one of the recovery codes you downloaded
            when you set up two-factor authentication.
          </Trans>
        </Heading>
      </Box>
      <Form {...methods} onSubmit={onSubmitCode}>
        <Stack spacing={4} justify='space-between'>
          <FormInput size='lg' id='code'>
            <InputBody>
              <TextInput
                borderColor='transparent'
                variant='outline'
                placeholder={i18n._(t`An 8-character recovery code`)}
              />
              <InputFeedback />
            </InputBody>
            <InputFooter />
          </FormInput>
          <FormSubmitButton
            size='lg'
            variant='solid'
            colorScheme='primary'
            isLoading={isSubmittingCode}
          >
            <Trans>
              Submit
            </Trans>
          </FormSubmitButton>
        </Stack>
      </Form>
    </>
  )
}
