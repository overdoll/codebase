// @flow
import type { State } from '@//:types/upload';

const STEPS = {
  REVIEW: 'REVIEW',
  ARRANGE: 'ARRANGE',
  FINISH: 'FINISH',
  TAG: 'TAG',
};

const EVENTS = {
  THUMBNAILS: 'THUMBNAILS',
  URLS: 'URLS',
  FILES: 'FILES',
  STEP: 'STEP',
  PROGRESS: 'PROGRESS',
  TAG_CHARACTERS: 'TAG_CHARACTERS',
  TAG_ARTIST: 'TAG_ARTIST',
  TAG_CATEGORIES: 'TAG_CATEGORIES',
  SUBMIT: 'SUBMIT',
  ALL: 'ALL',
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
};

export { STEPS, EVENTS, INITIAL_STATE };
