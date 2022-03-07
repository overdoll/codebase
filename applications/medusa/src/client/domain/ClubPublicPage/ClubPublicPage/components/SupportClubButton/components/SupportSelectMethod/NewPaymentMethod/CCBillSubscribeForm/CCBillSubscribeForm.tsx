import type { CCBillSubscribeFormFragment$key } from '@//:artifacts/CCBillSubscribeFormFragment.graphql'
import type { CCBillSubscribeFormMutation, Currency } from '@//:artifacts/CCBillSubscribeFormMutation.graphql'

import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { Form, FormInput, FormSubmitButton, InputFooter, SwitchInput } from '@//:modules/content/HookedComponents/Form'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useToast } from '@//:modules/content/ThemeComponents'
import { ExternalLink } from '@//:modules/routing'

interface Props {
  query: CCBillSubscribeFormFragment$key
  currency: string
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

export default function CCBillSubscribeForm ({
  query,
  currency
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const { i18n } = useLingui()

  const [commit, isInFlight] = useMutation<CCBillSubscribeFormMutation>(Mutation)

  const schema = Joi.object({
    guidelines: Joi
      .boolean()
      .required()
      .valid(true)
      .messages({
        'any.only': i18n._(t`You must agree to follow the guidelines`)
      }),
    savePayment: Joi
      .boolean()
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      guidelines: false,
      savePayment: true
    }
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          clubId: data.id,
          currency: currency as Currency,
          savePaymentDetailsForLater: formValues.savePayment
        }
      },
      onCompleted () {

      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error unlocking your account`
        })
      }
    })
  }

  const notify = useToast()

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormInput
          size='md'
          id='guidelines'
        >
          <HStack spacing={2}>
            <SwitchInput />
            <Heading fontSize='md' color='gray.00'>
              <Trans>
                I agree to follow the
              </Trans>
              <ExternalLink to='www.corpodoll.com/supporter-guidelines/'>
                <Trans>
                  Supporter Guidelines
                </Trans>
              </ExternalLink>
            </Heading>
          </HStack>
          <InputFooter />
        </FormInput>
        <FormInput
          size='md'
          id='savePayment'
        >
          <HStack spacing={2}>
            <SwitchInput />
            <Heading fontSize='md' color='gray.00'>
              <Trans>
                Remember this payment method
              </Trans>
            </Heading>
          </HStack>
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          colorScheme='teal'
          size='lg'
        >
          <Trans>
            Subscribe with CCBill
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
