import type { Event, State, Step } from '@//:types/upload'

interface steps {
  ARRANGE: Step
  AUDIENCE: Step
  BRAND: Step
  CATEGORY: Step
  CHARACTER: Step
  REVIEW: Step
  SUBMIT: Step
}

const STEPS: steps = {
  ARRANGE: 'ARRANGE',
  AUDIENCE: 'AUDIENCE',
  BRAND: 'BRAND',
  CATEGORY: 'CATEGORY',
  CHARACTER: 'CHARACTER',
  REVIEW: 'REVIEW',
  SUBMIT: 'SUBMIT'
}

interface events {
  URLS: Event
  FILES: Event
  CONTENT: Event
  STEP: Event
  PROGRESS: Event
  AUDIENCE: Event
  BRAND: Event
  CHARACTERS: Event
  CATEGORIES: Event
  CLEANUP: Event
  IN_REVIEW: Event
}

const EVENTS: events = {
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
  brand: null,
  characters: {},
  categories: {},
  cleanup: () => {
  },
  isInReview: false
}

export { STEPS, EVENTS, INITIAL_STATE }
