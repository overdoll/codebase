/**
 * @flow
 */
import type { Node } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Search from '../search/Search';

type Props = {
  children: Node,
  search: any,
};

export default function Section({ children, search }: Props): Node {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div
      sx={{
        border: '2px solid blue',
        padding: '2px',
        marginBottom: '3px',
      }}
    >
      {children}
      <button onClick={onOpen}>add</button>
      {open &&
        createPortal(
          <Search onClose={onClose}>{args => search(args, onClose)}</Search>,
          RootElement,
        )}
    </div>
  );
}
