/**
 * @flow
 */
import type { Node } from 'react'
import { Flex } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Link from '@//:modules/routing/Link'
import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'
import { ClickableBox } from '@//:modules/content/PageLayout'

type Props = {
  children: string,
  path: string,
  disabled?: boolean,
}

export default function PagePanelWrap ({ path, children, disabled }: Props): Node {
  return (
    <Link disabled={disabled} to={path}>
      <ClickableBox>
        <Flex justify='space-between'>
          <Flex justify='flex-start' align='flex-start' direction='column'>
            {children}
          </Flex>
          <Flex w={6} ml={1} align='center' justify='center'>
            <Icon icon={InterfaceArrowsButtonRight} w={6} fill='gray.500' />
          </Flex>
        </Flex>
      </ClickableBox>
    </Link>
  )
}
