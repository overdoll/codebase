import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  AdminRefundAccountTransactionFormMutation
} from '@//:artifacts/AdminRefundAccountTransactionFormMutation.graphql'
import {
  AdminRefundAccountTransactionFormFragment$key
} from '@//:artifacts/AdminRefundAccountTransactionFormFragment.graphql'
import { Form, FormInput, FormSubmitButton, InputFooter, InputHeader } from '@//:modules/content/HookedComponents/Form'
import AdminGenerateRefundAmountForAccountTransactionInput
  from './AdminGenerateRefundAmountForAccountTransactionInput/AdminGenerateRefundAmountForAccountTransactionInput'

interface Props {
  query: AdminRefundAccountTransactionFormFragment$key
}

interface RefundValues {
  amount: number
}

const Fragment = graphql`
  fragment AdminRefundAccountTransactionFormFragment on AccountTransaction {
    id
    ...AdminGenerateRefundAmountForAccountTransactionInputFragment
  }
`

const Mutation = graphql`
  mutation AdminRefundAccountTransactionFormMutation ($input: RefundAccountTransactionInput!) {
    refundAccountTransaction(input: $input) {
      accountTransaction {
        id
        type
        events {
          amount
          currency
          reason
          timestamp
        }
      }
    }
  }
`

export default function AdminRefundAccountTransactionForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<AdminRefundAccountTransactionFormMutation>(Mutation)

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
      onCompleted () {
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
            <AdminGenerateRefundAmountForAccountTransactionInput query={data} />
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
