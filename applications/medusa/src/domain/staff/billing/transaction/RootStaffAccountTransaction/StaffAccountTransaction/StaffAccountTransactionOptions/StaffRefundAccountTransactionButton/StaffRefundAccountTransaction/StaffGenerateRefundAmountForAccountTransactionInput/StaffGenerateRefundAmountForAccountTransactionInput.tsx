import { SelectInput } from '@//:modules/content/HookedComponents/Form'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import {
  StaffGenerateRefundAmountForAccountTransactionInputMutation,
  StaffGenerateRefundAmountForAccountTransactionInputMutation$data,
} from '@//:artifacts/StaffGenerateRefundAmountForAccountTransactionInputMutation.graphql'
import {
  StaffGenerateRefundAmountForAccountTransactionInputFragment$key,
} from '@//:artifacts/StaffGenerateRefundAmountForAccountTransactionInputFragment.graphql'
import displayPrice from '@//:modules/support/displayPrice'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { useEffect, useState } from 'react'

interface Props {
  query: StaffGenerateRefundAmountForAccountTransactionInputFragment$key
}

const Fragment = graphql`
  fragment StaffGenerateRefundAmountForAccountTransactionInputFragment on AccountTransaction {
    id
  }
`

const Mutation = graphql`
  mutation StaffGenerateRefundAmountForAccountTransactionInputMutation ($input: GenerateRefundAmountForAccountTransactionInput!) {
    generateRefundAmountForAccountTransaction(input: $input) {
      refundAmount {
        currency
        maximumAmount
        proratedAmount
      }
    }
  }
`

export default function StaffGenerateRefundAmountForAccountTransactionInput ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const [generateRefund, isGeneratingRefund] = useMutation<StaffGenerateRefundAmountForAccountTransactionInputMutation>(Mutation)
  const [refundAmount, setRefundAmount] = useState<StaffGenerateRefundAmountForAccountTransactionInputMutation$data['generateRefundAmountForAccountTransaction']['refundAmount'] | null>(null)

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
