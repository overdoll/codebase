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
  TAG_AUDIENCES: 'audiences',
  TAG_BRANDS: 'brands',
  TAG_CHARACTERS: 'characters',
  TAG_CATEGORIES: 'categories',
  SUBMIT: 'submit',
  CLEANUP: 'cleanup',
  PENDING: 'pending'
}

const INITIAL_STATE: State = {
  files: [],
  urls: {},
  content: null,
  step: STEPS.ARRANGE,
  progress: {},
  audiences: {},
  brands: {},
  characters: {},
  categories: {},
  submit: {},
  cleanup: null,
  pending: false
}

export { STEPS, EVENTS, INITIAL_STATE }
