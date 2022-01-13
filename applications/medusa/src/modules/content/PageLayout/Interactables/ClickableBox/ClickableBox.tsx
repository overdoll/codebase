import Button from '../../../../form/Button/Button'
import { HTMLChakraProps } from '@chakra-ui/react'
import { ForwardedRef, ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
  forwardRef?: ForwardedRef<any>
}

export default function ClickableBox ({
  children,
  ...rest
}: Props, forwardRef): JSX.Element {
  return (
    <Button
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
}
