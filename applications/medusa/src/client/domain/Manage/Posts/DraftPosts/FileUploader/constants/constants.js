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
  STEP: 'step',
  PROGRESS: 'progress',
  AUDIENCE: 'audience',
  BRAND: 'brand',
  CHARACTERS: 'characters',
  CATEGORIES: 'categories',
  CLEANUP: 'cleanup',
  IN_REVIEW: 'isInReview'
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
  cleanup: null,
  isInReview: false
}

export { STEPS, EVENTS, INITIAL_STATE }
