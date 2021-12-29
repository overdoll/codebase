import { Flex, HStack } from '@chakra-ui/react'
import Icon from '../../../../Icon/Icon'
import { Link } from '../../../../../routing'
import { ArrowButtonRight } from '@//:assets/icons/navigation'
import { ClickableBox } from '../../../index'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  path: string
  disabled?: boolean
}

export default function PagePanelWrap ({
  path,
  children,
  disabled
}: Props): JSX.Element {
  return (
    <Link
      disabled={disabled}
      to={path}
    >
      <ClickableBox disabled={disabled} p={3}>
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
              icon={ArrowButtonRight}
              w={6}
              fill='gray.500'
            />
          </Flex>
        </Flex>
      </ClickableBox>
    </Link>
  )
}
