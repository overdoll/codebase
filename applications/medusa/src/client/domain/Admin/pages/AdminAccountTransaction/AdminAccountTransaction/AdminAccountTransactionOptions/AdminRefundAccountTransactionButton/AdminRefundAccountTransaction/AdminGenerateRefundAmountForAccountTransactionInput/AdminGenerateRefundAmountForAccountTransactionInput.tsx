import { SelectInput } from '@//:modules/content/HookedComponents/Form'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import {
  AdminGenerateRefundAmountForAccountTransactionInputMutation,
  AdminGenerateRefundAmountForAccountTransactionInputMutation$data
} from '@//:artifacts/AdminGenerateRefundAmountForAccountTransactionInputMutation.graphql'
import {
  AdminGenerateRefundAmountForAccountTransactionInputFragment$key
} from '@//:artifacts/AdminGenerateRefundAmountForAccountTransactionInputFragment.graphql'
import displayPrice from '@//:modules/support/displayPrice'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { useEffect, useState } from 'react'

interface Props {
  query: AdminGenerateRefundAmountForAccountTransactionInputFragment$key
}

const Fragment = graphql`
  fragment AdminGenerateRefundAmountForAccountTransactionInputFragment on AccountTransaction {
    id
  }
`

const Mutation = graphql`
  mutation AdminGenerateRefundAmountForAccountTransactionInputMutation ($input: GenerateRefundAmountForAccountTransactionInput!) {
    generateRefundAmountForAccountTransaction(input: $input) {
      refundAmount {
        currency
        maximumAmount
        proratedAmount
      }
    }
  }
`

export default function AdminGenerateRefundAmountForAccountTransactionInput ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const [generateRefund, isGeneratingRefund] = useMutation<AdminGenerateRefundAmountForAccountTransactionInputMutation>(Mutation)
  const [refundAmount, setRefundAmount] = useState<AdminGenerateRefundAmountForAccountTransactionInputMutation$data['generateRefundAmountForAccountTransaction']['refundAmount'] | null>(null)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  useEffect(() => {
    generateRefund({
      variables: {
        input: {
          accountTransactionId: data.id
        }
      },
      onCompleted (data) {
        setRefundAmount(data.generateRefundAmountForAccountTransaction.refundAmount)
      }
    })
  }, [])

  console.log('re-render')

  const MaximumRefundOption = (): JSX.Element => {
    if (refundAmount == null) {
      return <></>
    }

    const maximumAmountPrice = displayPrice({
      amount: refundAmount.maximumAmount,
      currency: refundAmount.currency,
      locale: locale
    })

    return (
      <option disabled={refundAmount.maximumAmount === 0} value={refundAmount.maximumAmount}>
        <Trans>
          {maximumAmountPrice} - Maximum Amount
        </Trans>
      </option>
    )
  }

  const ProratedRefundOption = (): JSX.Element => {
    if (refundAmount == null) {
      return <></>
    }

    const proratedAmountPrice = displayPrice({
      amount: refundAmount.proratedAmount,
      currency: refundAmount.currency,
      locale: locale
    })

    return (
      <option disabled={refundAmount.proratedAmount === 0} value={refundAmount.proratedAmount}>
        <Trans>
          {proratedAmountPrice} - Prorated Amount
        </Trans>
      </option>
    )
  }

  return (
    <SelectInput isDisabled={isGeneratingRefund || refundAmount == null} placeholder={i18n._(t`Select refund amount`)}>
      <ProratedRefundOption />
      <MaximumRefundOption />
    </SelectInput>
  )
}
