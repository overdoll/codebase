import { Fade, Flex, HTMLChakraProps, Spinner } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { ClickableBox } from '../../../PageLayout'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
  isPending?: boolean | undefined
}

export default function ClickableTile ({
  children,
  isPending,
  ...rest
}: Props): JSX.Element {
  return (
    <ClickableBox
      isDisabled={isPending}
      p={0}
      h='100%'
      w='100%'
      borderRadius='md'
      position='relative'
      {...rest}
    >
      {children}
      <Fade
        in={isPending}
        style={{
          position: 'absolute',
          top: 0,
          margin: 4
        }}
      >
        <Flex bg='dimmers.500' borderRadius='full' p={1}>
          <Spinner size='sm' />
        </Flex>
      </Fade>
    </ClickableBox>
  )
}
