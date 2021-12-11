/**
 * @flow
 */
import type { Node } from 'react'
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
