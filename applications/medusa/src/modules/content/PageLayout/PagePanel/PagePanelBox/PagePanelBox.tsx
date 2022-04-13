import { ClickableBox } from '../../index'
import { ButtonProps, Flex, HStack } from '@chakra-ui/react'
import Icon from '../../Flair/Icon/Icon'
import { ArrowButtonRight, ShareExternalLink } from '@//:assets/icons'
import { forwardRef, ReactNode } from 'react'

interface Props extends ButtonProps {
  children: ReactNode
  isExternal: boolean
}

const PagePanelBox = forwardRef(({
  children,
  isExternal,
  ...rest
}: Props, forwardRef): JSX.Element => {
  return (
    <ClickableBox ref={forwardRef} p={3} {...rest}>
      <Flex justify='space-between'>
        <HStack
          spacing={3}
          w='100%'
          align='center'
        >
          {children}
        </HStack>
        <Flex
          w={6}
          ml={1}
          align='center'
          justify='center'
        >
          <Icon
            icon={isExternal ? ShareExternalLink : ArrowButtonRight}
            w={6}
            fill='gray.500'
          />
        </Flex>
      </Flex>
    </ClickableBox>
  )
})

export default PagePanelBox
