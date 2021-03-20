// @flow
import type { State } from '@//:types/upload';

const STEPS = {
  REVIEW: 'REVIEW',
  ARRANGE: 'ARRANGE',
  FINISH: 'FINISH',
  TAG: 'TAG',
};

const EVENTS = {
  THUMBNAILS: 'thumbnails',
  URLS: 'urls',
  FILES: 'files',
  STEP: 'step',
  PROGRESS: 'progress',
  TAG_CHARACTERS: 'characters',
  TAG_ARTIST: 'artist',
  TAG_CATEGORIES: 'categories',
  SUBMIT: 'submit',
  CLEANUP: 'cleanup',
};

const INITIAL_STATE: State = {
  thumbnails: {},
  files: [],
  urls: {},
  step: null,
  progress: {},
  artist: {},
  characters: {},
  categories: {},
  submit: {},
  cleanup: null,
};

export { STEPS, EVENTS, INITIAL_STATE };
