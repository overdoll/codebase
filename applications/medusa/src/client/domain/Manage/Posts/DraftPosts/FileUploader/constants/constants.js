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
  URLS: 'urls',
  FILES: 'files',
  CONTENT: 'content',
  FILE_LIMIT: 'file_limit',
  CLEAR_CONTENT: 'clear_content',
  STEP: 'step',
  PROGRESS: 'progress',
  AUDIENCE: 'audience',
  BRAND: 'brand',
  TAG_CHARACTERS: 'characters',
  CATEGORIES: 'categories',
  SUBMIT: 'submit',
  CLEANUP: 'cleanup'
}

const INITIAL_STATE: State = {
  files: [],
  urls: {},
  file_limit: 0,
  content: null,
  step: STEPS.CATEGORY,
  progress: {},
  audience: null,
  brands: [],
  characters: [],
  categories: [],
  submit: {},
  cleanup: null
}

export { STEPS, EVENTS, INITIAL_STATE }
