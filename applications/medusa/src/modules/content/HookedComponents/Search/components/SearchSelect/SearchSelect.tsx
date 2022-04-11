import { useState } from 'react'
import { Select, SelectProps, Spinner } from '@chakra-ui/react'
import { RegisterFunctionReturn } from '../../types'
import { Icon } from '../../../../PageLayout'
import { ArrowButtonDown } from '@//:assets/icons'

type Props = SelectProps & RegisterFunctionReturn

export default function SearchSelect ({
  id,
  onChangeRegister,
  isPending,
  children,
  ...rest
}: Props): JSX.Element {
  const [selectValue, setSelect] = useState('')

  const onChangeInput = (value: string): void => {
    setSelect(value)
    onChangeRegister(value !== '' ? value : null)
  }

  return (
    <Select
      id={id}
      size='lg'
      value={selectValue}
      onChange={(e) => onChangeInput(e.target.value)}
      icon={isPending
        ? <Spinner />
        : <Icon icon={ArrowButtonDown} fill='inherit' p={1} />}
      isDisabled={isPending}
      variant='filled'
      {...rest}
    >
      {children}
    </Select>
  )
}
