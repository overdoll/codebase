/**
 * @flow
 */
import type { Node } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Search from '../../search/Search';
import Characters from './query/Characters';

type Props = {
  dispatch: any,
  state: any,
};

export default function TagCharacters({ state, dispatch }: Props): Node {
  return (
    <>
      <div>characters comp</div>
      {createPortal(
        <Search>{({ args }) => <Characters args={args} />}</Search>,
        RootElement,
      )}
    </>
  );
}
