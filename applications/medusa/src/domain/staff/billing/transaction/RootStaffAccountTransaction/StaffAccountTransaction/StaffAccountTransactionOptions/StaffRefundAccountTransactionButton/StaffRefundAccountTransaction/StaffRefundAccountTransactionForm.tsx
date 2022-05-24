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
import displayPrice from '@//:modules/support/displayPrice'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'

interface Props {
  query: StaffRefundAccountTransactionFormFragment$key
  onClose: () => void
}

interface RefundValues {
  amount: number
}

const Fragment = graphql`
  fragment StaffRefundAccountTransactionFormFragment on AccountTransaction {
    id
    currency
    ...StaffGenerateRefundAmountForAccountTransactionInputFragment
  }
`

const Mutation = graphql`
  mutation StaffRefundAccountTransactionFormMutation ($input: RefundAccountTransactionInput!) {
    refundAccountTransaction(input: $input) {
      accountTransaction {
        id
        type
        currency
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
  query,
  onClose
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffRefundAccountTransactionFormMutation>(Mutation)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

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
      onCompleted (completedData) {
        if (completedData?.refundAccountTransaction?.accountTransaction == null) {
          notify({
            status: 'error',
            title: t`There was an error issuing a refund for ${formValues.amount}`
          })
          return
        }
        const refundedAmount = displayPrice({
          amount: formValues.amount,
          currency: data.currency as string,
          locale: locale
        })
        notify({
          status: 'success',
          title: t`Successfully refunded ${refundedAmount}`
        })
        onClose()
      },
      onError () {
        const refundedAmount = displayPrice({
          amount: formValues.amount,
          currency: data.currency as string,
          locale: locale
        })
        notify({
          status: 'error',
          title: t`There was an error issuing a refund for ${refundedAmount}`
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
