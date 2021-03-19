/**
 * @flow
 */
import type { Node } from 'react';
import type { State } from '../../../__types__/types';

type Props = {
  state: State,
};

export default function Finish({ state }: Props): Node {
  return <>review required: {state.submit.review}</>;
}
