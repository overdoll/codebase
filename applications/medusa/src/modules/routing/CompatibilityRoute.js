/**
 * @flow
 */
import { useHistory } from '@//:modules/routing/useHistory';
import { useLocation } from '@//:modules/routing/useLocation';
import type { Node } from 'react';

type Props = {
  children: any,
};

export default function CompatibilityRoute({ children }: Props): Node {
  const history = useHistory();
  const location = useLocation();

  return children({ history, location });
}
