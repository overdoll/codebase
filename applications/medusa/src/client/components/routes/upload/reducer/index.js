/**
 * @flow
 */
import type { Action, State } from '@//:types/upload';
import { EVENTS } from '../constants/constants';

const reducer: any = (state: State, action: Action): State => {
  const act: string = action.type;

  switch (action.type) {
    case EVENTS.THUMBNAILS:
    case EVENTS.URLS:
    case EVENTS.PROGRESS:
    case EVENTS.TAG_CHARACTERS:
    case EVENTS.TAG_CATEGORIES: {
      const id: string = Object.keys(action.value)[0];

      const copy = { ...state[act] };

      if (action.remove) {
        // TODO: remove record from indexeddb
        delete copy[id];

        return { ...state, [act]: copy };
      }

      // TODO: add record to indexeddb
      return { ...state, [act]: { ...copy, [id]: action.value[id] } };
    }
    case EVENTS.TAG_ARTIST:
    case EVENTS.FILES:
    case EVENTS.STEP: {
      // TODO: overwrite all indexeddb records
      return { ...state, [act]: action.value };
    }
    case EVENTS.CLEANUP:
      // TODO: cleanup indexeddb records
      return { ...state, submit: action.value };
    case EVENTS.SUBMIT:
      // TODO: cleanup indexeddb records
      return action.value;
    default:
      return state;
  }
};

export default reducer;
