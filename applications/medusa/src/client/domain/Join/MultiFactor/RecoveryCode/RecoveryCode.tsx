import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useHistory } from '@//:modules/routing'
import { prepareViewer } from '../../support'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import { RecoveryCodeMutation } from '@//:artifacts/RecoveryCodeMutation.graphql'
import { RecoveryCodeFragment$key } from '@//:artifacts/RecoveryCodeFragment.graphql'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import translateValidation from '@//:modules/validation/translateValidation'

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

  const {
    register,
    setError,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useForm<CodeValues>({
    resolver: joiResolver(
      schema
    )
  })

  const notify = useToast()

  const history = useHistory()

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
            message: translateValidation(data.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode.validation)
          })
          return
        }
        notify({
          status: 'success',
          isClosable: true,
          title: t`A recovery code was successfully used up to log you in`
        })
        history.push('/profile')
      },
      updater: (store) => {
        const payload = store.getRootField('grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode').getLinkedRecord('account')

        prepareViewer(store, payload)
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error submitting a recovery code`,
          isClosable: true
        })
      }
    })
  }

  const success = isDirty && (errors.code == null) && isSubmitted

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmitCode)}
      >
        <FormControl
          isInvalid={errors.code != null}
        >
          <FormLabel>
            <Trans>
              Enter a recovery code
            </Trans>
          </FormLabel>
          <Flex justify='center'>
            <StyledInput
              register={register('code')}
              success={success}
              error={errors.code != null}
              placeholder={i18n._(t`An 8-character recovery code`)}
              errorMessage={errors.code?.message}
              size='md'
            />
            <Button
              size='md'
              variant='solid'
              type='submit'
              colorScheme='gray'
              disabled={errors.code != null}
              isLoading={isSubmittingCode}
              ml={2}
            >
              <Trans>
                Submit
              </Trans>
            </Button>
          </Flex>
        </FormControl>
      </form>
    </>
  )
}
