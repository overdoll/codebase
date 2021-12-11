/**
 * @flow
 */
import type { Node } from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import Icon from '@//:modules/content/Icon/Icon';
import Link from '@//:modules/routing/Link';
import { ArrowButtonRight } from '../../../../../../assets/icons/navigation';

import { ClickableBox } from '@//:modules/content/PageLayout';

type Props = {
  children: string,
  path: string,
  disabled?: boolean,
}

export default function PagePanelWrap ({ path, children, disabled }: Props): Node {
  return (
    <Link disabled={disabled} to={path}>
      <ClickableBox p={3}>
        <Flex justify='space-between'>
          <HStack spacing={3} w='100%' align='center'>
            {children}
          </HStack>
          <Flex w={6} ml={1} align='center' justify='center'>
            <Icon icon={ArrowButtonRight} w={6} fill='gray.500' />
          </Flex>
        </Flex>
      </ClickableBox>
    </Link>
  )
}
