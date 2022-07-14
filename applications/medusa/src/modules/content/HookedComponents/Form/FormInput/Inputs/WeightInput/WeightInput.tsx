import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import NumberInput from './NumberInput/NumberInput'

export default function WeightInput (): JSX.Element {
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
          onChange,
          value
        }
      }) => (
        <NumberInput onChange={(val) => onChange(val)} value={value} />
      )}
    />

  )
}
