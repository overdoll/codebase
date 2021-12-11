/**
 * @flow
 */

import type { Node } from 'react';
import { IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Icon from '@//:modules/content/Icon/Icon';
import { useTranslation } from 'react-i18next';

type Props = {
  disabled: boolean
}

export default function PostMenu({ disabled }: Props): Node {
  const [t] = useTranslation('general');

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        borderRadius='full'
        disabled={disabled}
        pt={2}
        pb={2}
        h='100%'
        icon={
          <Icon
            w='inherit'
            h='inherit'
            icon={}
            fill='gray.500'
          />
        }
        variant='ghost'
      />
      <MenuList>
        <MenuItem>{t('menu.copy_link')}</MenuItem>
      </MenuList>
    </Menu>
  );
}
