import { useState } from 'react'
import { ButtonProps } from '@chakra-ui/react'
import { RegisterFunctionReturn } from '../../types'
import Button from '../../../../../form/Button/Button'

interface Props extends Omit<ButtonProps, 'id' | 'defaultValue'>, RegisterFunctionReturn {
  nullifyOnClear?: boolean
  activeValue?: boolean
}

export default function SearchBooleanButton ({
  id,
  onChangeRegister,
  isPending,
  size = 'lg',
  nullifyOnClear,
  defaultValue,
  activeValue = true,
  ...rest
}: Props): JSX.Element {
  const [value, setValue] = useState<null | boolean | string>(defaultValue ?? (nullifyOnClear === true ? null : ''))

  const activeProps = {
    colorScheme: 'green'
  }

  const inactiveProps = {
    colorScheme: 'gray'
  }

  const onClick = (): void => {
    if (nullifyOnClear === true) {
      if (value == null) {
        onChangeRegister(true)
        setValue(true)
        return
      }
      onChangeRegister(null)
      setValue(null)
      return
    }

    if (value == null) {
      onChangeRegister(true)
      setValue(true)
      return
    }
    onChangeRegister('')
    setValue('')
  }

  return (
    <Button
      {...(value === activeValue ? activeProps : inactiveProps)}
      onClick={onClick}
      id={id}
      isLoading={isPending}
      size={size}
      {...rest}
    />
  )
}
