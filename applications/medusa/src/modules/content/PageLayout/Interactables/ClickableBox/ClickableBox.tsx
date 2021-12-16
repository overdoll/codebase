import Button from '../../../../form/Button/Button'
import { ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends ButtonProps {
  children: ReactNode
}

export default function ClickableBox ({
  children,
  ...rest
}: Props): JSX.Element {
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
