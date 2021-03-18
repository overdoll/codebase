/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  selected: boolean,
  children: any,
  onSelect: any,
};

export default function Element({ selected, children, onSelect }: Props): Node {
  return (
    <div onClick={onSelect}>
      {selected && 'selected'}
      {children}
    </div>
  );
}
