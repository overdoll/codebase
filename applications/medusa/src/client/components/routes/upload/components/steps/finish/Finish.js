/**
 * @flow
 */
import type { Node } from 'react';
import type { State } from '@//:types/upload';

type Props = {
  state: State,
};

export default function Finish({ state }: Props): Node {
  return <>review required: {state.submit.review}</>;
}
