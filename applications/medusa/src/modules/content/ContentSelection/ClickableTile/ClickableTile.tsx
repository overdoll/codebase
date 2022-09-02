import { Box, ButtonProps, Flex, Spinner } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'
import { ClickableBox } from '../../PageLayout'

interface Props extends ButtonProps {
  children: ReactNode
  isPending?: boolean | undefined
}

const ClickableTile = forwardRef<any, Props>(({
  children,
  isPending,
  ...rest
}: Props, forwardRef) => {
  return (
    <ClickableBox
      ref={forwardRef}
      isDisabled={isPending}
      ignoreTransition
      p={0}
      h='100%'
      w='100%'
      borderRadius='md'
      position='relative'
      overflow='hidden'
      whiteSpace='normal'
      bg='transparent'
      _active={{ bg: 'transparent' }}
      _hover={{ bg: 'transparent' }}
      {...rest}
    >
      {children}
      {isPending === true &&
        <Box
          position='absolute'
          top={0}
          right={0}
          p={1}
        >
          <Flex p={1} bg='dimmers.500' borderRadius='full'>
            <Spinner size='sm' />
          </Flex>
        </Box>}
    </ClickableBox>
  )
})
export default ClickableTile
