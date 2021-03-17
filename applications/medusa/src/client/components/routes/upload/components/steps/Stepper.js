/**
 * @flow
 */
import type { Node } from 'react';
import Arrange from './arrange/Arrange';
import Begin from './begin/Begin';
import { events, steps } from '../../Upload';
import Tag from './tag/Tag';
import Review from './review/Review';
import Finish from './finish/Finish';

type Props = {
  uppy: any,
  state: any,
  dispatch: any,
};

export default function Stepper({ uppy, state, dispatch }: Props): Node {
  // Add files
  const onAddFiles = files => {
    if (state.step === null) {
      dispatch({ type: events.STEP, value: steps.ARRANGE });
    }

    dispatch({ type: events.FILES, value: uppy.getFiles() });
  };

  switch (state.step) {
    case steps.ARRANGE:
      return (
        <Arrange
          uppy={uppy}
          dispatch={dispatch}
          onAddFiles={onAddFiles}
          state={state}
        />
      );
    case steps.TAG:
      return <Tag />;
    case steps.REVIEW:
      return <Review />;
    case steps.FINISH:
      return <Finish />;
    default:
      return <Begin uppy={uppy} onAddFiles={onAddFiles} />;
  }
}
