import { graphql, useMutation } from 'react-relay/hooks'
import type { TotpSubmissionFormMutation } from '@//:artifacts/TotpSubmissionFormMutation.graphql'
import { FormControl, HStack, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'

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

  const { i18n } = useLingui()

  const schema = Joi.object({
    code: Joi
      .string()
      .regex(/^[0-9]+$/)
      .length(6)
      .required()
      .messages({
        'string.empty': i18n._(t`Please enter a 6-digit authentication code`),
        'string.length': i18n._(t`The code must be 6 digits long`),
        'string.pattern.base': i18n._(t`The code can only contain numbers`)
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
            message: data.enrollAccountMultiFactorTotp.validation
          })
          return
        }
        notify({
          status: 'success',
          title: t`Two-factor authentication was successfully set up`,
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
          title: t`There was an error setting up two-factor authentication`,
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
            <Trans>
              Activate
            </Trans>
          </Button>
        </HStack>
      </FormControl>
    </form>
  )
}
