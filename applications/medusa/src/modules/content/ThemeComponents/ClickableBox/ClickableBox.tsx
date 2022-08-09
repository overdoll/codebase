import Button from '../../../form/Button/Button'
import { ButtonProps } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

interface Props extends ButtonProps {
  children: ReactNode
  ignoreTransition?: boolean | undefined
}

const ClickableBox = forwardRef<any, Props>(({
  children,
  ...rest
}: Props, forwardRef) => {
  return (
    <Button
      ref={forwardRef}
      w='100%'
      h='100%'
      size='sm'
      p={0}
      fontFamily='body'
      fontWeight='normal'
      textAlign='left'
      variant='panel'
      {...rest}
    >
      {children}
    </Button>
  )
})

export default ClickableBox
