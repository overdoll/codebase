import type {
  CCBillSelectSavedPaymentFormFragment$key
} from '@//:artifacts/CCBillSelectSavedPaymentFormFragment.graphql'
import type {
  CCBillSelectSavedPaymentFormViewerFragment$key
} from '@//:artifacts/CCBillSelectSavedPaymentFormViewerFragment.graphql'
import type {
  CCBillSelectSavedPaymentFormMutation,
  Currency
} from '@//:artifacts/CCBillSelectSavedPaymentFormMutation.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { HStack, Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  SwitchInput
} from '@//:modules/content/HookedComponents/Form'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useToast } from '@//:modules/content/ThemeComponents'
import SelectPaymentMethodInput from './SelectPaymentMethodInput/SelectPaymentMethodInput'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import SupporterGuidelinesAgreement from '../../../../SupporterGuidelinesAgreement/SupporterGuidelinesAgreement'
import { useQueryParam } from 'use-query-params'
import posthog from 'posthog-js'

interface Props {
  query: CCBillSelectSavedPaymentFormFragment$key
  viewerQuery: CCBillSelectSavedPaymentFormViewerFragment$key
}

interface FormValues {
  guidelines: boolean
  savedPaymentMethodId: string
}

const Fragment = graphql`
  fragment CCBillSelectSavedPaymentFormFragment on Club {
    id
  }
`

const ViewerFragment = graphql`
  fragment CCBillSelectSavedPaymentFormViewerFragment on Account {
    ...SelectPaymentMethodInputFragment
  }
`

const Mutation = graphql`
  mutation CCBillSelectSavedPaymentFormMutation($input: BecomeClubSupporterWithAccountSavedPaymentMethodInput!) {
    becomeClubSupporterWithAccountSavedPaymentMethod(input: $input) {
      ccbillTransactionToken
    }
  }
`

export default function CCBillSelectSavedPaymentForm ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [commit, isInFlight] = useMutation<CCBillSelectSavedPaymentFormMutation>(Mutation)

  const [, setTokenParam] = useQueryParam<string | null | undefined>('token')

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
    savedPaymentMethodId: Joi
      .string()
      .required()
      .messages({
        'any.required': i18n._(t`Please select a payment method`),
        'string.empty': i18n._(t`Please select a payment method`)
      })
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      guidelines: state.guidelines
    }
  })

  const onSubmit = (formValues): void => {
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
          savedPaymentMethodId: formValues.savedPaymentMethodId
        }
      },
      onCompleted (payload) {
        posthog?.capture('submit-existing-payment')
        setTokenParam(payload?.becomeClubSupporterWithAccountSavedPaymentMethod?.ccbillTransactionToken)
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
      <Stack spacing={4}>
        <FormInput
          size='md'
          id='savedPaymentMethodId'
        >
          <InputHeader>
            <Trans>
              Select a saved payment method
            </Trans>
          </InputHeader>
          <SelectPaymentMethodInput query={viewerData} />
          <InputFooter />
        </FormInput>
        <Stack spacing={2}>
          <FormInput
            size='md'
            id='guidelines'
          >
            <HStack spacing={2}>
              <SwitchInput colorScheme='teal' />
              <SupporterGuidelinesAgreement />
            </HStack>
            <InputFooter />
          </FormInput>
          <FormSubmitButton
            isLoading={isInFlight}
            colorScheme='teal'
            size='lg'
          >
            <Trans>
              Subscribe
            </Trans>
          </FormSubmitButton>
        </Stack>
      </Stack>
    </Form>
  )
}
