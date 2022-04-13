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
}: Props, forwardRef): JSX.Element => {
  return (
    <Button
      ref={forwardRef}
      w='100%'
      h='fill'
      size='sm'
      p={2}
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
