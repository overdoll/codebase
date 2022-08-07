import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import WeightNumberInput from './WeightNumberInput/WeightNumberInput'

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
        <WeightNumberInput onChange={(val) => onChange(val)} value={value} />
      )}
    />

  )
}
