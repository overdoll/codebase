/**
 * @flow
 */

import { Icon } from '@//:modules/content';
import Synchronize from '@streamlinehq/streamline-regular/lib/interface-essential/Synchronize';

type Props = {
  color?: any,
};

export default function Loading({ color }: Props): Node {
  return (
    <span>
      <Icon
        icon={Synchronize.SynchronizeArrow1}
        size={18}
        strokeWidth={3}
        stroke={color}
      />
    </span>
  );
}
