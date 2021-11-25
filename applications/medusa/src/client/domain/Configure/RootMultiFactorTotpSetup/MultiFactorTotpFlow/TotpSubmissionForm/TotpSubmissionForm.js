/**
 * @flow
 */

import { graphql, useMutation } from 'react-relay/hooks'
import type { TotpSubmissionFormMutation } from '@//:artifacts/TotpSubmissionFormMutation.graphql'
import {
  Flex,
  useToast, FormControl, InputGroup, Input, InputRightElement, FormErrorMessage
} from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceAlertWarningTriangle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-warning-triangle.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'

type CodeValues = {
  code: string
}

type Props = {
  setIsSuccessful: () => void
}

const TotpSubmissionFormMutationGQL = graphql`
  mutation TotpSubmissionFormMutation($input: EnrollAccountMultiFactorTotpInput!) {
    enrollAccountMultiFactorTotp(input: $input) {
      validation
      accountMultiFactorTotpEnabled
    }
  }
`

export default function TotpSubmissionForm (props: Props): Node {
  const [submitTotp, isSubmittingTotp] = useMutation<TotpSubmissionFormMutation>(
    TotpSubmissionFormMutationGQL
  )

  const [t] = useTranslation('configure')

  const schema = Joi.object({
    code: Joi
      .string()
      .regex(/^[0-9]+$/)
      .length(6)
      .required()
      .messages({
        'string.empty': t('totp.flow.code_step.form.validation.empty'),
        'string.length': t('totp.flow.code_step.form.validation.length'),
        'string.pattern.base': t('totp.flow.code_step.form.validation.pattern')
      })
  })

  const { register, setError, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<CodeValues>({
    resolver: joiResolver(
      schema
    )
  })

  const notify = useToast()

  const submitTotpCode = (formData) => {
    submitTotp({
      variables: {
        input: {
          code: formData.code
        }
      },
      onCompleted (data) {
        if (data.enrollAccountMultiFactorTotp.validation) {
          setError('code', {
            type: 'mutation',
            message: data.enrollAccountMultiFactorTotp.validation
          })
          return
        }
        notify({
          status: 'success',
          title: t('totp.flow.code_step.form.query.success'),
          isClosable: true
        })
        props.setIsSuccessful()
      },
      updater: (store, payload) => {
        const viewer = store.getRoot().getLinkedRecord('viewer').getLinkedRecord('multiFactorSettings')
        viewer.setValue(payload.enrollAccountMultiFactorTotp.accountMultiFactorTotpEnabled, 'multiFactorTotpConfigured')
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
    <form noValidate onSubmit={handleSubmit(submitTotpCode)}>
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
            isLoading={isSubmittingTotp}
          >
            {t('totp.flow.code_step.form.submit')}
          </Button>
        </Flex>
        <FormErrorMessage>
          {errors.code && errors.code.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  )
}
