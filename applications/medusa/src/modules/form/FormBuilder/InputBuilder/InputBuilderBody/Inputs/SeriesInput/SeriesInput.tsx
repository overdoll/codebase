import { useContext } from 'react'
import { InputBuilderContext } from '../../../InputBuilder'
import { Controller, useFormContext } from 'react-hook-form'
import SelectSeriesButton
  from '../../../../../../../client/domain/Admin/components/SelectSeriesButton/SelectSeriesButton'

export default function SeriesInput (): JSX.Element {
  const {
    id
  } = useContext(InputBuilderContext)

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
          isInvalid={invalid}
          onChange={(id) => onChange(id)}
        />
      )}
    />

  )
}
