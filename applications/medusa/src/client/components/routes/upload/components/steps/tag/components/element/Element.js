/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  selected: boolean,
  children: Node,
  onSelect: any,
};

export default function Element({ selected, children, onSelect }: Props): Node {
  return (
    <div
      onClick={onSelect}
      sx={{
        border: selected ? '2px solid red' : '2px solid black',
        backgroundColor: 'black',
        marginBottom: '3px',
      }}
    >
      {children}
    </div>
  );
}
