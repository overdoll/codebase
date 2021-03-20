/**
 * @flow
 */
import type { Action, State } from '@//:types/upload';
import { EVENTS } from '../constants/constants';
import db from '../storage';

// reducer maintains the whole state of the upload form so that we can
// easily update our indexeddb state in the case of a crash
const reducer: any = (state: State, action: Action): State => {
  const act: string = action.type;

  const copy = { ...state[act] };

  switch (action.type) {
    case EVENTS.THUMBNAILS:
    case EVENTS.URLS:
    case EVENTS.PROGRESS: {
      const id: string = Object.keys(action.value)[0];

      if (action.remove) {
        // delete item from database
        db.table(act).delete(id);

        delete copy[id];

        return { ...state, [act]: copy };
      }

      // add item to database
      db.table(act).put({ id, value: action.value[id] });

      return { ...state, [act]: { ...copy, [id]: action.value[id] } };
    }
    case EVENTS.TAG_CHARACTERS:
    case EVENTS.TAG_CATEGORIES: {
      const id: string = action.value.id;

      if (action.remove) {
        // delete item from database
        db.table(act).delete(id);

        delete copy[id];

        return { ...state, [act]: copy };
      }

      // add item to database
      db.table(act).put(action.value);

      return { ...state, [act]: { ...copy, [id]: action.value } };
    }
    case EVENTS.TAG_ARTIST:
      db.table('artist').put(action.value);
      return { ...state, artist: action.value };
    case EVENTS.FILES:
      // start a transaction to clear all the files and then bulk add the next set
      db.transaction('rw', db.files, async () => {
        db.table('files').clear();
        db.table('files').bulkPut(action.value);
      });

      return { ...state, files: action.value };
    case EVENTS.STEP:
      db.table('step').put({ id: 1, step: action.value });
      return { ...state, step: action.value };
    case EVENTS.CLEANUP:
      db.clear();
      return { ...state, submit: action.value };
    case EVENTS.SUBMIT:
      db.clear();
      return action.value;
    default:
      return state;
  }
};

export default reducer;
