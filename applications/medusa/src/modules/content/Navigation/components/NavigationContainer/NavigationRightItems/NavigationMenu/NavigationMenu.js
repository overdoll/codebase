/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Tooltip
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfacePageControllerSettings
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/page-controller/interface-page-controller-settings.svg'
import InterfaceArrowsShrink3
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-3.svg'

type Props = {
  children: Node,
}

export default function NavigationMenu ({ children }: Props): Node {
  const [t] = useTranslation('navigation')

  return (
    <Menu autoSelect={false}>
      {({ isOpen }) => (
        <>
          <Tooltip hasArrow label={t('nav.menu')} placement='bottom'>
            <MenuButton
              bg='transparent'
              borderRadius={10}
              h='42px' w='42px' pr={2} pl={2} as={IconButton}
              aria-label={t('nav.menu')}
              icon={
                <Icon
                  icon={isOpen ? InterfaceArrowsShrink3 : InterfacePageControllerSettings} w='fill' h='fill'
                  fill={isOpen ? 'gray.100' : 'gray.300'}
                />
              }
            />
          </Tooltip>
          <MenuList minW='300px' boxShadow='xs'>
            {children}
          </MenuList>
        </>
      )}
    </Menu>
  )
}
