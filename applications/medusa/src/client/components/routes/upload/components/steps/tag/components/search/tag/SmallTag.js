/**
 * @flow
 */
import type { Node } from 'react';
import Text from '@//:modules/typography/text/Text';

type Props = {
  title: string,
};

export default function SmallTag({ title }: Props): Node {
  return (
    <div sx={{ backgroundColor: 'yellow', maxWidth: ['100px', '150px'] }}>
      <Text sx={{ fontSize: 1 }}>{title}</Text>
    </div>
  );
}
