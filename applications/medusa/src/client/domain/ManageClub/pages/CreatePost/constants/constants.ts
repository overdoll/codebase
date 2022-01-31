import type { Event, State, Step } from '@//:types/upload'

interface steps {
  ARRANGE: Step
  AUDIENCE: Step
  CATEGORY: Step
  CHARACTER: Step
  REVIEW: Step
  SUBMIT: Step
}

const STEPS: steps = {
  ARRANGE: 'ARRANGE',
  AUDIENCE: 'AUDIENCE',
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
  CHARACTERS: Event
  CATEGORIES: Event
  CLEANUP: Event
  IN_REVIEW: Event
  IS_PROCESSING: Event
}

const EVENTS: events = {
  URLS: 'urls',
  FILES: 'files',
  CONTENT: 'content',
  STEP: 'step',
  PROGRESS: 'progress',
  AUDIENCE: 'audience',
  CHARACTERS: 'characters',
  CATEGORIES: 'categories',
  CLEANUP: 'cleanup',
  IN_REVIEW: 'isInReview',
  IS_PROCESSING: 'isProcessing'
}

const INITIAL_STATE: State = {
  files: [],
  urls: {},
  content: null,
  step: STEPS.ARRANGE,
  progress: {},
  audience: null,
  characters: {},
  categories: {},
  cleanup: () => {
  },
  isInReview: false,
  isProcessing: false
}

export { STEPS, EVENTS, INITIAL_STATE }
