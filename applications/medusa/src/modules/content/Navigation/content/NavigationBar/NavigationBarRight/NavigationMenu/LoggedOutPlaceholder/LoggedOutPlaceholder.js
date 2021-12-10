/**
 * @flow
 */
import { Heading, MenuItem } from '@chakra-ui/react'
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'
import { MenuButton } from '@//:modules/content/Navigation/components'
import NavLink from '@//:modules/routing/NavLink'

import { LoginKeys } from '../../../../../../../../assets/icons/navigation'

type Props = {}

export default function LoggedOutPlaceholder (props: Props): Node {
  const [t] = useTranslation('navigation')

  return (
    <NavLink to='/join'>
      {({ isActive }) => (
        <MenuButton active={isActive} icon={LoginKeys} color='green.500' label={t('menu.join')} />
      )}
    </NavLink>
  )
}
