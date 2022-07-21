import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import SelectTopicButton from './SelectTopicButton/SelectTopicButton'

export default function TopicInput (): JSX.Element {
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
        <SelectTopicButton
          size={size}
          isInvalid={invalid}
          onChange={(id) => onChange(id)}
        />
      )}
    />
  )
}
