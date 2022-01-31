import { HTMLChakraProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { ClickableBox } from '../../../PageLayout'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function ClickableTile ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <ClickableBox p={0} h='100%' w='100%' borderRadius='md' {...rest}>
      {children}
    </ClickableBox>
  )
}
