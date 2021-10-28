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
  TAG_AUDIENCES: 'audiences',
  TAG_BRANDS: 'brands',
  TAG_CHARACTERS: 'characters',
  TAG_CATEGORIES: 'categories',
  SUBMIT: 'submit',
  CLEANUP: 'cleanup'
}

const INITIAL_STATE: State = {
  files: [],
  urls: {},
  file_limit: 0,
  content: null,
  step: STEPS.AUDIENCE,
  progress: {},
  audiences: [],
  brands: [],
  characters: [],
  categories: [],
  submit: {},
  cleanup: null
}

export { STEPS, EVENTS, INITIAL_STATE }
