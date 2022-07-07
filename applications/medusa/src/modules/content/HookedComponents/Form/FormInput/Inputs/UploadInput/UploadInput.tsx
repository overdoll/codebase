import { useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import { HStack } from '@chakra-ui/react'
import SingleFileImageUpload from '../../../../../Interactables/Upload/components/SingleFileImageUpload/SingleFileImageUpload'

export default function UploadInput (): JSX.Element {
  const {
    id,
    size
  } = useContext(FormInputContext)

  const {
    control
  } = useFormContext()

  return (
    <HStack spacing={4} align='center'>
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
            size={size}
            isInvalid={invalid}
            onChange={onChange}
          />
        )}
      />
    </HStack>
  )
}
