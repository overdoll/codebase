import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  StaffRefundAccountTransactionFormMutation
} from '@//:artifacts/StaffRefundAccountTransactionFormMutation.graphql'
import {
  StaffRefundAccountTransactionFormFragment$key
} from '@//:artifacts/StaffRefundAccountTransactionFormFragment.graphql'
import { Form, FormInput, FormSubmitButton, InputFooter, InputHeader } from '@//:modules/content/HookedComponents/Form'
import StaffGenerateRefundAmountForAccountTransactionInput
  from './StaffGenerateRefundAmountForAccountTransactionInput/StaffGenerateRefundAmountForAccountTransactionInput'

interface Props {
  query: StaffRefundAccountTransactionFormFragment$key
}

interface RefundValues {
  amount: number
}

const Fragment = graphql`
  fragment StaffRefundAccountTransactionFormFragment on AccountTransaction {
    id
    ...StaffGenerateRefundAmountForAccountTransactionInputFragment
  }
`

const Mutation = graphql`
  mutation StaffRefundAccountTransactionFormMutation ($input: RefundAccountTransactionInput!) {
    refundAccountTransaction(input: $input) {
      accountTransaction {
        id
        type
        events {
          amount
          currency
          reason
          createdAt
        }
      }
    }
  }
`

export default function StaffRefundAccountTransactionForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffRefundAccountTransactionFormMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    amount: Joi
      .number()
      .integer()
      .required()
      .messages({
        'any.required': i18n._(t`A refund amount is required`),
        'number.base': i18n._(t`A refund amount is required`)
      })
  })

  const notify = useToast()

  const methods = useForm<RefundValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          accountTransactionId: data.id,
          ...formValues
        }
      },
      onCompleted (data) {
        if (data.refundAccountTransaction == null) {
          notify({
            status: 'error',
            title: t`There was an error issuing a refund for ${formValues.amount}`
          })
          return
        }
        notify({
          status: 'success',
          title: t`Successfully refunded ${formValues.amount}`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error issuing a refund for ${formValues.amount}`
        })
      }
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <Stack spacing={2}>
          <FormInput
            id='amount'
            size='lg'
          >
            <InputHeader>
              <Trans>
                Refund Amount
              </Trans>
            </InputHeader>
            <StaffGenerateRefundAmountForAccountTransactionInput query={data} />
            <InputFooter />
          </FormInput>
        </Stack>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='lg'
          colorScheme='green'
        >
          <Trans>
            Refund Transaction
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
