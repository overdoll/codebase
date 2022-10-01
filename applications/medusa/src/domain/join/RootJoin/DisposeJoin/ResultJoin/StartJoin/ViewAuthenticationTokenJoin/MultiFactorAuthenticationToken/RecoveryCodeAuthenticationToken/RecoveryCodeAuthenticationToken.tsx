import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { RecoveryCodeAuthenticationTokenMutation } from '@//:artifacts/RecoveryCodeAuthenticationTokenMutation.graphql'
import {
  RecoveryCodeAuthenticationTokenFragment$key
} from '@//:artifacts/RecoveryCodeAuthenticationTokenFragment.graphql'
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
import { Barcode } from '@//:assets/icons'
import useGrantCleanup from '../../../support/useGrantCleanup'
import { Icon } from '@//:modules/content/PageLayout'

interface CodeValues {
  code: string
}

interface Props {
  query: RecoveryCodeAuthenticationTokenFragment$key
}

const Mutation = graphql`
  mutation RecoveryCodeAuthenticationTokenMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(input: $input) {
      revokedAuthenticationTokenId
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
        ...AccountIconFragment
      }
    }
  }
`

const Fragment = graphql`
  fragment RecoveryCodeAuthenticationTokenFragment on AuthenticationToken {
    id
    token
  }
`

export default function RecoveryCodeAuthenticationToken (props: Props): JSX.Element {
  const { query } = props

  const fragment = useFragment(Fragment, query)

  const [submitCode, isSubmittingCode] = useMutation<RecoveryCodeAuthenticationTokenMutation>(
    Mutation
  )

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

  const {
    successfulGrant,
    invalidateGrant
  } = useGrantCleanup()

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
        if (payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.validation === 'TOKEN_INVALID') {
          invalidateGrant(store, fragment.id)
          return
        }
        if (payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.account?.id != null) {
          const viewerPayload = store.getRootField('grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode').getLinkedRecord('account')
          successfulGrant(store, viewerPayload, payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.revokedAuthenticationTokenId)
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
