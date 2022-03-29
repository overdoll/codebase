import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormInputContext } from '@//:modules/content/HookedComponents/Form/FormInput/FormInput'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import type { SelectPaymentMethodInputFragment$key } from '@//:artifacts/SelectPaymentMethodInputFragment.graphql'
import SelectPaymentMethod from './SelectPaymentMethod/SelectPaymentMethod'

interface Props {
  query: SelectPaymentMethodInputFragment$key
}

const Fragment = graphql`
  fragment SelectPaymentMethodInputFragment on Account {
    ...SelectPaymentMethodFragment
  }
`

export default function SelectPaymentMethodInput ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    id
  } = useContext(FormInputContext)

  const {
    control
  } = useFormContext()

  return (
    <Controller
      control={control}
      name={id}
      render={({
        field: {
          onChange
        }
      }) => (
        <SelectPaymentMethod
          query={data}
          onChange={onChange}
        />
      )}
    />
  )
}
