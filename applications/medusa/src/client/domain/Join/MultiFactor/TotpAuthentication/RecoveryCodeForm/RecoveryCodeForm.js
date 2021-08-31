/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks'
import { Flex, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Button from '@//:modules/form/Button'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import InterfaceAlertWarningTriangle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-warning-triangle.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'

type CodeValues = {
  code: string,
}

const RecoveryCodeMutationGQL = graphql`
  mutation RecoveryCodeFormMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(input: $input) {
      validation
    }
  }
`

const schema = Joi.object({
  code: Joi
    .string()
    .alphanum()
    .length(8)
    .required()
})

export default function RecoveryCodeForm (): Node {
  const [submitCode, isSubmittingCode] = useMutation(
    RecoveryCodeMutationGQL
  )

  const [t] = useTranslation('auth')

  const { register, setError, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<CodeValues>({
    resolver: joiResolver(
      schema
    )
  })

  const notify = useToast()

  const onSubmitCode = (formData) => {
    submitCode({
      variables: {
        input: {
          code: formData.code
        }
      },
      onCompleted (data) {
        if (data?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.validation) {
          setError('code', {
            type: 'mutation',
            message: data.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode.validation
          })
          return
        }
        notify({
          status: 'success',
          title: t('totp.flow.code_step.form.query.success'),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('totp.flow.code_step.form.query.error'),
          isClosable: true
        })
      }
    })
  }

  const success = isDirty && !errors.code && isSubmitted

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmitCode)}>
        <FormControl
          isInvalid={errors.code}
        >
          <Flex justify='center'>
            <InputGroup mr={2} size='sm'>
              <Input
                {...register('code')}
                variant='outline'
                size='md'
                placeholder='123456'
              />
              {(errors.code || success) && (
                <InputRightElement h='100%' mr={1}>
                  <Icon
                    m={2}
                    icon={success ? InterfaceValidationCheck : InterfaceAlertWarningTriangle}
                    fill={success ? 'green.600' : 'orange.500'}
                  />
                </InputRightElement>
              )}
            </InputGroup>
            <Button
              size='md'
              variant='solid'
              type='submit'
              colorScheme='primary'
              disabled={errors.code}
              isLoading={isSubmittingCode}
            >
              {t('totp.flow.code_step.form.submit')}
            </Button>
          </Flex>
          <FormErrorMessage>
            {errors.code && errors.code.type === 'mutation' && errors.code.message}
            {errors.code && errors.code.type === 'string.empty' && t('totp.flow.code_step.form.validation.empty')}
            {errors.code && errors.code.type === 'string.length' && t('totp.flow.code_step.form.validation.length')}
            {errors.code && errors.code.type === 'string.alphanum' && t('totp.flow.code_step.form.validation.pattern')}
          </FormErrorMessage>
        </FormControl>
      </form>
    </>
  )
}
