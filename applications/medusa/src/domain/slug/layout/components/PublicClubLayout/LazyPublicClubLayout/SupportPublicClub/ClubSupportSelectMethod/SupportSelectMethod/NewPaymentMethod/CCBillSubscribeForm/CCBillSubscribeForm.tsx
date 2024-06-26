import type { CCBillSubscribeFormFragment$key } from '@//:artifacts/CCBillSubscribeFormFragment.graphql'
import type { CCBillSubscribeFormMutation, Currency } from '@//:artifacts/CCBillSubscribeFormMutation.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { HStack, Stack, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { Form, FormInput, FormSubmitButton, InputFooter, SwitchInput } from '@//:modules/content/HookedComponents/Form'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useToast } from '@//:modules/content/ThemeComponents'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import SupporterGuidelinesAgreement from '../../SupporterGuidelinesAgreement/SupporterGuidelinesAgreement'
import posthog from 'posthog-js'
import SecureText from '../../SecureText/SecureText'

interface Props {
  query: CCBillSubscribeFormFragment$key
  updateOriginLink: Dispatch<SetStateAction<string | null>>
  windowReference: MutableRefObject<Window | null>
}

interface FormValues {
  guidelines: boolean
  savePayment: boolean
}

const Fragment = graphql`
  fragment CCBillSubscribeFormFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation CCBillSubscribeFormMutation($input: GenerateCCBillClubSupporterPaymentLinkInput!) {
    generateCCBillClubSupporterPaymentLink(input: $input) {
      paymentLink
    }
  }
`

export default function CCBillSubscribeForm (props: Props): JSX.Element {
  const {
    query,
    updateOriginLink,
    windowReference
  } = props

  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<CCBillSubscribeFormMutation>(Mutation)

  const {
    state,
    dispatch
  } = useSequenceContext()

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    guidelines: Joi
      .boolean()
      .required()
      .valid(true)
      .messages({
        'any.only': i18n._(t`You must agree to the guidelines`)
      }),
    savePayment: Joi
      .boolean()
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      guidelines: state.guidelines,
      savePayment: state.savePayment
    }
  })

  const onSubmit = (formValues): void => {
    dispatch({
      type: 'savePayment',
      value: formValues.savePayment,
      transform: 'SET'
    })
    dispatch({
      type: 'guidelines',
      value: formValues.guidelines,
      transform: 'SET'
    })
    commit({
      variables: {
        input: {
          clubId: data.id,
          currency: state.currency as Currency,
          savePaymentDetailsForLater: formValues.savePayment
        }
      },
      onCompleted (payload) {
        posthog?.capture('submit-new-payment')
        const paymentLink = payload?.generateCCBillClubSupporterPaymentLink?.paymentLink as string
        if (paymentLink == null) return
        windowReference.current = window.open(paymentLink, '_blank', 'width=600,height=800')
        const url = new URL(paymentLink)
        updateOriginLink(url.origin)
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error subscribing. Please try again later.`
        })
      }
    })
  }

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormInput
          size='md'
          id='guidelines'
        >
          <HStack spacing={2}>
            <SwitchInput colorScheme='orange' />
            <SupporterGuidelinesAgreement />
          </HStack>
          <InputFooter />
        </FormInput>
        <FormInput
          size='md'
          id='savePayment'
        >
          <HStack spacing={2}>
            <SwitchInput colorScheme='orange' />
            <Text
              fontSize='md'
              color='gray.00'
            >
              <Trans>
                Remember this payment method
              </Trans>
            </Text>
          </HStack>
        </FormInput>
        <Stack align='center' spacing={2}>
          <FormSubmitButton
            isLoading={isInFlight}
            colorScheme='orange'
            size='lg'
            w='100%'
          >
            <Trans>
              Enter payment information
            </Trans>
          </FormSubmitButton>
          <SecureText />
        </Stack>
      </Stack>
    </Form>
  )
}
