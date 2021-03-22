/**
 * @flow
 */
import type { Node } from 'react';
import Arrange from './arrange/Arrange';
import Begin from './begin/Begin';
import { EVENTS, INITIAL_STATE, STEPS } from '../../constants/constants';
import Tag from './tag/Tag';
import Review from './review/Review';
import Finish from './finish/Finish';
import { graphql, useMutation } from 'react-relay/hooks';
import { useNotify } from '@//:modules/focus';
import type {
  CharacterRequest,
  StepsMutation,
} from '@//:artifacts/StepsMutation.graphql';
import type { Dispatch, State } from '@//:types/upload';

type Props = {
  uppy: any,
  state: State,
  dispatch: Dispatch,
};

const SubmitGraphQL = graphql`
  mutation StepsMutation($data: PostInput) {
    post(data: $data) {
      review
      validation {
        code
      }
    }
  }
`;

// Stepper - handles all stepping functions
export default function Steps({ uppy, state, dispatch }: Props): Node {
  const [commit, isInFlight] = useMutation<StepsMutation>(SubmitGraphQL);

  const notify = useNotify();

  // Tagging step - disabled if the conditions aren't met
  const NextDisabled =
    state.step === STEPS.TAG &&
    (Object.keys(state.characters).length < 1 ||
      Object.keys(state.artist).length < 1 ||
      Object.keys(state.categories).length < 3);

  // If the amount of files != the amount of urls (not all files were uploaded), then we can't submit yet
  const SubmitDisabled = state.files.length !== Object.keys(state.urls).length;

  const onAddFiles = (): void => {
    const files = uppy.getFiles();

    // no files were uploaded (error occurred)
    if (files.length === 0) {
      return;
    }

    // If not in any step, go to the arrange step
    if (state.step === null) {
      dispatch({ type: EVENTS.STEP, value: STEPS.ARRANGE });
    }
  };

  const Step = (): Node => {
    switch (state.step) {
      case STEPS.ARRANGE:
        return (
          <Arrange
            uppy={uppy}
            dispatch={dispatch}
            onAddFiles={onAddFiles}
            state={state}
          />
        );
      case STEPS.TAG:
        return (
          <Tag disabled={NextDisabled} dispatch={dispatch} state={state} />
        );
      case STEPS.REVIEW:
        return <Review disabled={SubmitDisabled} state={state} />;
      case STEPS.FINISH:
        return <Finish state={state} />;
      default:
        return <Begin uppy={uppy} onAddFiles={onAddFiles} />;
    }
  };

  const NextStep = (): void => {
    switch (state.step) {
      case STEPS.ARRANGE:
        dispatch({ type: EVENTS.STEP, value: STEPS.TAG });
        break;
      case STEPS.TAG:
        dispatch({ type: EVENTS.STEP, value: STEPS.REVIEW });
        break;
      default:
        break;
    }
  };

  const PrevStep = (): void => {
    switch (state.step) {
      case STEPS.TAG:
        dispatch({ type: EVENTS.STEP, value: STEPS.ARRANGE });
        break;
      case STEPS.REVIEW:
        dispatch({ type: EVENTS.STEP, value: STEPS.TAG });
        break;
      default:
        break;
    }
  };

  // onSubmit - submit post
  const onSubmit = (): void => {
    const urls: Array<string> = [];

    // make sure our urls keep their order
    state.files.forEach(file => {
      urls.push(state.urls[file.id]);
    });

    const characterRequests: Array<CharacterRequest> = [];
    const mediaRequests: Array<string> = [];

    // Sort all characters - if they're a requested character, then filter them out
    // also filter them out if the media is requested
    const characters = Object.keys(state.characters).filter(item => {
      const character = state.characters[item];

      // if the media is custom, use the name. otherwise use the id
      // the check is done on the backend against mediaRequests
      if (character.request) {
        characterRequests.push({
          name: character.name,
          media: character.media.request
            ? character.media.title
            : character.media.id,
        });
      }

      // if the media is requested, add it to our list
      if (character.media.request) {
        mediaRequests.push(character.media.title);
      }

      return !(character.media.request || character.request);
    });

    // Commit all results
    commit({
      variables: {
        data: {
          artistUsername: state.artist.username ?? '',
          artistId: state.artist.id,
          categories: Object.keys(state.categories),
          characters: characters,
          content: urls,
          characterRequests: characterRequests,
          mediaRequests: mediaRequests,
        },
      },
      onCompleted(data) {
        if (data.post?.validation !== null) {
          notify.error(data?.post?.validation?.code);
        } else {
          dispatch({ type: EVENTS.SUBMIT, value: data.post });
        }
      },
      onError(data) {
        notify.error('error with submission');
      },
    });
  };

  // Cleanup - reset uppy uploads and state
  const onCancel = () => {
    uppy.reset();
    dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE });
  };

  return (
    <>
      {Step()}
      {state.step !== null && state.step !== STEPS.FINISH && (
        <div>
          {state.step !== STEPS.ARRANGE ? (
            <button disabled={isInFlight} onClick={PrevStep}>
              prev
            </button>
          ) : (
            <button onClick={onCancel}>cancel</button>
          )}
          {state.step !== STEPS.REVIEW ? (
            <button disabled={NextDisabled} onClick={NextStep}>
              next
            </button>
          ) : (
            <button onClick={onSubmit} disabled={SubmitDisabled || isInFlight}>
              submit
            </button>
          )}
        </div>
      )}
    </>
  );
}
