/**
 * @flow
 */

import { Icon } from '@//:modules/content';
import SynchronizeArrow1 from '@streamlinehq/streamlinehq/img/streamline-regular/synchronize-arrow-1-WipT2h.svg';

type Props = {
  color?: any,
};

export default function Loading({ color }: Props): Node {
  return (
    <span>
      <Icon icon={SynchronizeArrow1} size={18} strokeWidth={3} stroke={color} />
    </span>
  );
}
