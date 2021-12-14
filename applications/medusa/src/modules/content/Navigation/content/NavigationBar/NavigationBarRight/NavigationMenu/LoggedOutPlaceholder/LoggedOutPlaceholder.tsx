import { useTranslation } from 'react-i18next'
import { MenuButton } from '@//:modules/content/Navigation/components'
import NavLink from '@//:modules/routing/NavLink'
import { LoginKeys } from '@//:assets/icons/navigation'

export default function LoggedOutPlaceholder (): JSX.Element {
  const [t] = useTranslation('navigation')

  return (
    <NavLink to='/join'>
      {({ isActive }) => (
        <MenuButton
          active={isActive}
          icon={LoginKeys}
          color='green.500'
          label={t('menu.join')}
        />
      )}
    </NavLink>
  )
}
