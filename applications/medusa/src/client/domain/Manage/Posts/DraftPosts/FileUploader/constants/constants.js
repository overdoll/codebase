/**
 * @flow
 */
import type { State } from '@//:types/upload'

const STEPS = {
  ARRANGE: 'ARRANGE',
  AUDIENCE: 'AUDIENCE',
  BRAND: 'BRAND',
  CATEGORY: 'CATEGORY',
  CHARACTER: 'CHARACTER',
  REVIEW: 'REVIEW',
  SUBMIT: 'SUBMIT'
}

const EVENTS = {
  ARRANGE_FILES: 'arrange_files',
  THUMBNAILS: 'thumbnails',
  URLS: 'urls',
  FILES: 'files',
  STEP: 'step',
  PROGRESS: 'progress',
  TAG_AUDIENCES: 'audiences',
  TAG_BRANDS: 'brands',
  TAG_CHARACTERS: 'characters',
  TAG_CATEGORIES: 'categories',
  SUBMIT: 'submit',
  CLEANUP: 'cleanup'
}

const INITIAL_STATE: State = {
  thumbnails: {},
  files: [],
  urls: {},
  step: STEPS.ARRANGE,
  progress: {},
  audiences: {},
  brands: {},
  characters: {},
  categories: {},
  submit: {},
  cleanup: null
}

export { STEPS, EVENTS, INITIAL_STATE }
