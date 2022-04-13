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
}: Props, forwardRef): JSX.Element => {
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
      bg='transparent'
      {...rest}
    >
      {children}
      {isPending === true &&
        <Box
          position='absolute'
          top={0}
          right={0}
          margin={2}
        >
          <Flex bg='dimmers.500' borderRadius='full' p={1}>
            <Spinner size='sm' />
          </Flex>
        </Box>}
    </ClickableBox>
  )
})
export default ClickableTile
