import { useState } from 'react'
import { IconButtonProps, Tooltip } from '@chakra-ui/react'
import { RegisterFunctionReturn } from '../../types'
import Button from '../../../../../form/Button/Button'

interface Props extends Omit<IconButtonProps, 'id' | 'defaultValue'>, RegisterFunctionReturn {
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
  const [value, setValue] = useState<null | boolean | string>(defaultValue ?? (nullifyOnClear === true ? null : false))

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

    if (value === false) {
      onChangeRegister(true)
      setValue(true)
      return
    }
    onChangeRegister(false)
    setValue(false)
  }

  return (
    <Tooltip
      label={rest['aria-label']}
    >
      <Button
        onClick={onClick}
        id={id}
        isLoading={isPending}
        size={size}
        {...rest}
      />
    </Tooltip>
  )
}
