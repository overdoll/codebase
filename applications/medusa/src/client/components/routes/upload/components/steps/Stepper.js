/**
 * @flow
 */
import type { Node } from 'react';
import Arrange from './arrange/Arrange';
import Begin from './begin/Begin';
import { events } from '../../Upload';

type Props = {
  uppy: any,
  state: any,
  dispatch: any,
};

export default function Stepper({ uppy, state, dispatch }: Props): Node {
  // Add files
  const onAddFiles = files => {
    if (state.step === null) {
      dispatch({ type: events.STEP, value: 'arrange' });
    }

    dispatch({ type: events.FILES, value: uppy.getFiles() });
  };

  switch (state.step) {
    case 'arrange':
      return (
        <Arrange
          uppy={uppy}
          dispatch={dispatch}
          onAddFiles={onAddFiles}
          state={state}
        />
      );
    default:
      return <Begin uppy={uppy} onAddFiles={onAddFiles} />;
  }
}
