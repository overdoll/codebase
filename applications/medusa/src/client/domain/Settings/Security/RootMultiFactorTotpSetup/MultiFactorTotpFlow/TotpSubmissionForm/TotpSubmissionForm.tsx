import { graphql, useMutation } from 'react-relay/hooks'
import type { TotpSubmissionFormMutation } from '@//:artifacts/TotpSubmissionFormMutation.graphql'
import { FormControl, HStack, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'

interface CodeValues {
  code: string
}

interface Props {
  setIsSuccessful: () => void
  id: string
}

const TotpSubmissionFormMutationGQL = graphql`
  mutation TotpSubmissionFormMutation($input: EnrollAccountMultiFactorTotpInput!) {
    enrollAccountMultiFactorTotp(input: $input) {
      validation
      accountMultiFactorTotpEnabled
    }
  }
`

export default function TotpSubmissionForm (props: Props): JSX.Element {
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

  const submitTotpCode = (formData): void => {
    submitTotp({
      variables: {
        input: {
          code: formData.code,
          id: props.id
        }
      },
      onCompleted (data) {
        if (data?.enrollAccountMultiFactorTotp?.validation != null) {
          setError('code', {
            type: 'mutation',
            message: t(`totp.flow.code_step.form.query.error.${data.enrollAccountMultiFactorTotp.validation}`)
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
        const viewer = store.getRoot().getLinkedRecord('viewer')
        const settings = viewer?.getLinkedRecord('multiFactorSettings')

        if (settings != null) {
          settings
            .setValue(payload?.enrollAccountMultiFactorTotp?.accountMultiFactorTotpEnabled, 'multiFactorTotpConfigured')
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t('totp.flow.code_step.form.query.error.message'),
          isClosable: true
        })
      }
    })
  }

  const success = isDirty && (errors.code == null) && isSubmitted

  return (
    <form noValidate onSubmit={handleSubmit(submitTotpCode)}>
      <FormControl
        isInvalid={errors.code != null}
      >
        <HStack align='flex-start'>
          <StyledInput
            register={register('code')}
            success={success}
            error={errors.code != null}
            size='md'
            variant='outline'
            placeholder='123456'
            errorMessage={errors?.code?.message}
          />
          <Button
            size='md'
            variant='solid'
            type='submit'
            ml={2}
            colorScheme='primary'
            disabled={errors.code != null}
            isLoading={isSubmittingTotp}
          >
            {t('totp.flow.code_step.form.submit')}
          </Button>
        </HStack>
      </FormControl>
    </form>
  )
}
