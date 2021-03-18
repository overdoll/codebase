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
import { graphql, useMutation } from 'react-relay/hooks';
import { useNotify } from '@//:modules/focus';
import type { StepperMutation } from '@//:artifacts/StepperMutation.graphql';

type Props = {
  uppy: any,
  state: any,
  dispatch: any,
  onCancel: any,
};

const steps = {
  REVIEW: 'REVIEW',
  ARRANGE: 'ARRANGE',
  FINISH: 'FINISH',
  TAG: 'TAG',
};

const SubmitGraphQL = graphql`
  mutation StepperMutation($data: PostInput) {
    post(data: $data) {
      review
    }
  }
`;

export default function Stepper({
  uppy,
  state,
  dispatch,
  onCancel,
}: Props): Node {
  const [commit, isInFlight] = useMutation<StepperMutation>(SubmitGraphQL);

  const notify = useNotify();

  // Tagging step - disabled if the conditions aren't met
  const NextDisabled =
    state.step === steps.TAG &&
    (Object.keys(state.characters).length < 1 ||
      Object.keys(state.artists).length < 1 ||
      Object.keys(state.categories).length < 3);

  // If the amount of files != the amount of urls (not all files were uploaded), then we can't submit yet
  const SubmitDisabled = state.files.length !== Object.keys(state.urls).length;

  // Add files
  const onAddFiles = (): void => {
    if (state.step === null) {
      dispatch({ type: events.STEP, value: steps.ARRANGE });
    }

    dispatch({ type: events.FILES, value: uppy.getFiles() });
  };

  const Step = (): Node => {
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
        return (
          <Tag disabled={NextDisabled} dispatch={dispatch} state={state} />
        );
      case steps.REVIEW:
        return <Review disabled={SubmitDisabled} state={state} />;
      case steps.FINISH:
        return <Finish state={state} />;
      default:
        return <Begin uppy={uppy} onAddFiles={onAddFiles} />;
    }
  };

  const NextStep = (): void => {
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

  const PrevStep = (): void => {
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

  // onSubmit - submit post
  const onSubmit = (): void => {
    commit({
      variables: {
        data: {
          artistUsername: '',
          categories: [],
          characters: [],
          artistId: null,
          images: [],
        },
      },
      onCompleted(data) {
        dispatch({ type: events.STEP, value: steps.FINISH });
      },
      onError(data) {
        notify.error('error with submission');
      },
    });
  };

  return (
    <>
      {Step()}
      <div>
        {state.step !== null && (
          <>
            {state.step !== steps.ARRANGE ? (
              <button onClick={PrevStep}>prev</button>
            ) : (
              <button onClick={onCancel}>cancel</button>
            )}
            {state.step !== steps.REVIEW ? (
              <button disabled={NextDisabled} onClick={NextStep}>
                next
              </button>
            ) : (
              <button
                onClick={onSubmit}
                disabled={SubmitDisabled || isInFlight}
              >
                submit
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
