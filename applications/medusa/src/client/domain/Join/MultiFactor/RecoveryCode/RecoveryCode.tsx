import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import { useHistory } from '@//:modules/routing'
import PrepareViewer from '@//:modules/support/prepareViewer/prepareViewer'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import { RecoveryCodeMutation } from '@//:artifacts/RecoveryCodeMutation.graphql'
import { RecoveryCodeFragment$key } from '@//:artifacts/RecoveryCodeFragment.graphql'

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

  const [t] = useTranslation('auth')

  const schema = Joi.object({
    code: Joi
      .string()
      .alphanum()
      .length(8)
      .required()
      .messages({
        'string.empty': t('multi_factor.recovery.form.validation.code.empty'),
        'string.length': t('multi_factor.recovery.form.validation.code.length'),
        'string.alphanum': t('multi_factor.recovery.form.validation.code.alphanum')
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
            message: data.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode.validation
          })
          return
        }
        notify({
          status: 'success',
          isClosable: true,
          title: t('multi_factor.recovery.form.query.success')
        })
        history.push('/profile')
      },
      updater: (store) => {
        const payload = store.getRootField('grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode').getLinkedRecord('account')

        PrepareViewer(store, payload)
      },
      onError (data) {
        console.log(data)
        notify({
          status: 'error',
          title: t('multi_factor.recovery.form.query.error'),
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
          <FormLabel>{t('multi_factor.recovery.form.header')}</FormLabel>
          <Flex justify='center'>
            <StyledInput
              register={register('code')}
              success={success}
              error={errors.code != null}
              placeholder={t('multi_factor.recovery.form.placeholder')}
              errorMessage={errors.code?.message}
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
              {t('multi_factor.recovery.form.submit')}
            </Button>
          </Flex>
        </FormControl>
      </form>
    </>
  )
}
