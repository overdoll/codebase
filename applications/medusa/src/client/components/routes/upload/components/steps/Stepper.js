/**
 * @flow
 */
import type { Node } from 'react';
import Arrange from './arrange/Arrange';
import Begin from './begin/Begin';
import { events } from '../../Upload';
import Tag from './tag/Tag';
import Review from './review/Review';
import Finish from './finish/Finish';

type Props = {
  uppy: any,
  state: any,
  dispatch: any,
  onSubmit: any,
  onCancel: any,
};

const steps = {
  REVIEW: 'REVIEW',
  ARRANGE: 'ARRANGE',
  FINISH: 'FINISH',
  TAG: 'TAG',
};

export default function Stepper({
  uppy,
  state,
  dispatch,
  onSubmit,
  onCancel,
}: Props): Node {
  // Add files
  const onAddFiles = files => {
    if (state.step === null) {
      dispatch({ type: events.STEP, value: steps.ARRANGE });
    }

    dispatch({ type: events.FILES, value: uppy.getFiles() });
  };

  const Step = () => {
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
  };

  const NextStep = () => {
    switch (state.step) {
      case steps.ARRANGE:
        dispatch({ type: events.STEP, value: steps.TAG });
        break;
      case steps.TAG:
        dispatch({ type: events.STEP, value: steps.REVIEW });
        break;
      default:
        break;
    }
  };

  const PrevStep = () => {
    switch (state.step) {
      case steps.TAG:
        dispatch({ type: events.STEP, value: steps.ARRANGE });
        break;
      case steps.REVIEW:
        dispatch({ type: events.STEP, value: steps.TAG });
        break;
      default:
        break;
    }
  };

  return (
    <>
      {Step()}
      {state.step !== null && (
        <>
          {state.step !== steps.ARRANGE ? (
            <button onClick={PrevStep}>prev</button>
          ) : (
            <button onClick={onCancel}>cancel</button>
          )}
          {state.step !== steps.REVIEW ? (
            <button onClick={NextStep}>next</button>
          ) : (
            <button
              onClick={onSubmit}
              // If the amount of files != the amount of urls (not all files were uploaded), then we can't submit yet
              disabled={state.files.length !== Object.keys(state.urls).length}
            >
              submit
            </button>
          )}
        </>
      )}
    </>
  );
}
