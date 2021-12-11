/**
 * @flow
 */
import type { Node } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationButton } from '@//:modules/content/Navigation/components';
import NavLink from '@//:modules/routing/NavLink';
import { LoginKeys } from '../../../../../../../../assets/icons/navigation';

type Props = {}

export default function SimpleLoginButton (props: Props): Node {
  const [t] = useTranslation('navigation')

  return (
    <NavLink to='/join'>
      {({ isActiveBasePath }) => (
        <NavigationButton w='42px' active={isActiveBasePath} label={t('nav.join')} icon={LoginKeys} />
      )}
    </NavLink>
  )
}
