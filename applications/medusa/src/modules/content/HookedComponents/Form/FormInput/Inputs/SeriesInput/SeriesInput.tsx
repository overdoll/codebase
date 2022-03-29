import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import SelectSeriesButton
  from './SelectSeriesButton/SelectSeriesButton'

export default function SeriesInput (): JSX.Element {
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
        <SelectSeriesButton
          size={size}
          isInvalid={invalid}
          onChange={(id) => onChange(id)}
        />
      )}
    />
  )
}
