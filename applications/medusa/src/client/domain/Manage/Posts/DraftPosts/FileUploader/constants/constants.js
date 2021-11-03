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
  CLEAR_CONTENT: 'clear_content',
  STEP: 'step',
  PROGRESS: 'progress',
  AUDIENCE: 'audience',
  BRAND: 'brand',
  CHARACTERS: 'characters',
  CATEGORIES: 'categories',
  SUBMIT: 'submit',
  CLEANUP: 'cleanup'
}

const INITIAL_STATE: State = {
  files: [],
  urls: {},
  content: null,
  step: STEPS.ARRANGE,
  progress: {},
  audience: null,
  brands: null,
  characters: {},
  categories: {},
  submit: {},
  cleanup: null
}

export { STEPS, EVENTS, INITIAL_STATE }
