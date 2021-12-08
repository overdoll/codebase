/**
 * @flow
 */
import type { Node } from 'react'
import Login2 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-2.svg'
import { useTranslation } from 'react-i18next'
import { NavigationButton } from '@//:modules/content/Navigation/components'
import NavLink from '@//:modules/routing/NavLink'

type Props = {}

export default function SimpleLoginButton (props: Props): Node {
  const [t] = useTranslation('navigation')

  return (
    <NavLink to='/join'>
      {({ isActiveBasePath }) => (
        <NavigationButton w='42px' active={isActiveBasePath} label={t('nav.join')} icon={Login2} />
      )}
    </NavLink>
  )
}
