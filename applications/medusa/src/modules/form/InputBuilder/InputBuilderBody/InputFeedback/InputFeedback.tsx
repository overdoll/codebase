import { InputElementProps, InputRightElement } from '@chakra-ui/react'
import { useContext } from 'react'
import { InputBuilderContext } from '../../InputBuilder'
import InputIcon from './InputIcon/InputIcon'

export default function InputBuilderHeader ({
  children,
  ...rest
}: InputElementProps): JSX.Element {
  const {
    size = 'md',
    isPending,
    isValid,
    error
  } = useContext(InputBuilderContext)

  const determinePadding = (): number => {
    if (['xl'].includes(size)) {
      return 5
    }
    if (['md', 'lg'].includes(size)) {
      return 3
    }
    return 2
  }

  if (isPending === true || isValid === true || error != null) {
    return (
      <InputRightElement
        p={determinePadding()}
        mr={0}
        h='100%'
        pointerEvents='none'
        {...rest}
      >
        <InputIcon />
      </InputRightElement>
    )
  }

  return <></>
}
