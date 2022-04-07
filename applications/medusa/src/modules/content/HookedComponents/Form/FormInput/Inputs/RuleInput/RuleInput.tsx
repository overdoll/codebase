import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import SelectRuleButton from './SelectRuleButton/SelectRuleButton'

export default function RuleInput (): JSX.Element {
  const {
    id,
    size
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
        },
        fieldState: {
          invalid
        }
      }) => (
        <SelectRuleButton
          size={size}
          isInvalid={invalid}
          onChange={(id) => onChange(id)}
        />
      )}
    />

  )
}
