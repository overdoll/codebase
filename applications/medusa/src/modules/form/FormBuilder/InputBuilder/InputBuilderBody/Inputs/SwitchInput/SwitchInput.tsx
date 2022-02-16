import { ReactNode, useContext } from 'react'
import { InputBuilderContext } from '../../../InputBuilder'
import { useFormContext } from 'react-hook-form'
import Switch from '../../../../../Switch/Switch'
import { Heading, HStack } from '@chakra-ui/react'

interface Props {
  placeholder: ReactNode
}

export default function SwitchInput ({ placeholder }: Props): JSX.Element {
  const {
    id
  } = useContext(InputBuilderContext)

  const {
    register
  } = useFormContext()

  return (
    <HStack spacing={2} align='center'>
      <Switch
        {...register(id)}
      />
      <Heading fontSize='md' color='gray.00'>
        {placeholder}
      </Heading>
    </HStack>
  )
}
