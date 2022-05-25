import { graphql, useMutation } from 'react-relay/hooks'
import type { TotpActivationFormMutation } from '@//:artifacts/TotpActivationFormMutation.graphql'
import { HStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { t, Trans } from '@lingui/macro'
import Totp from '@//:modules/validation/Totp'
import translateValidation from '@//:modules/validation/translateValidation'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFooter,
  TextInput
} from '@//:modules/content/HookedComponents/Form'

interface CodeValues {
  code: string
}

interface Props {
  setIsSuccessful: () => void
  id: string
}

const Mutation = graphql`
  mutation TotpActivationFormMutation($input: EnrollAccountMultiFactorTotpInput!) {
    enrollAccountMultiFactorTotp(input: $input) {
      validation
      account {
        id
        multiFactorEnabled
        multiFactorTotpConfigured
      }
    }
  }
`

export default function TotpActivationForm (props: Props): JSX.Element {
  const [submitTotp, isSubmittingTotp] = useMutation<TotpActivationFormMutation>(
    Mutation
  )

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

  const submitTotpCode = (formData): void => {
    submitTotp({
      variables: {
        input: {
          id: props.id,
          ...formData
        }
      },
      onCompleted (data) {
        if (data?.enrollAccountMultiFactorTotp?.validation != null) {
          setError('code', {
            type: 'mutation',
            message: i18n._(translateValidation(data.enrollAccountMultiFactorTotp.validation))
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
      onError () {
        notify({
          status: 'error',
          title: t`There was an error setting up two-factor authentication`,
          isClosable: true
        })
      }
    })
  }

  return (
    <Form {...methods} onSubmit={submitTotpCode}>
      <FormInput size='md' id='code'>
        <HStack align='flex-start'>
          <InputBody>
            <TextInput placeholder='123456' />
          </InputBody>
          <FormSubmitButton
            isLoading={isSubmittingTotp}
            size='md'
            colorScheme='green'
          >
            <Trans>
              Activate
            </Trans>
          </FormSubmitButton>
        </HStack>
        <InputFooter />
      </FormInput>
    </Form>
  )
}
