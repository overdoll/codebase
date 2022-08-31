import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import SingleFileImageUpload from '../../../../Upload/components/SingleFileImageUpload/SingleFileImageUpload'

export default function UploadInput (): JSX.Element {
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
        },
        fieldState: {
          invalid
        }
      }) => (
        <SingleFileImageUpload
          isInvalid={invalid}
          onChange={onChange}
        />
      )}
    />
  )
}
