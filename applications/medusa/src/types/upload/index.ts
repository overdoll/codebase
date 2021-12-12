import { UppyFile } from '@uppy/core'

export interface Urls {
  [item: string]: {
    url: string
    mimeType: string
  }
}

export interface ResourceUrl {
  url: string
  mimeType: string
}

export interface Content {
  id: string
  type: string
  urls: ResourceUrl[]
}

export interface Thumbnails {
  [thumbnail: string]: {
    id: string
    type: string
    urls: Urls
  }
}

export interface Progress {
  [progress: string]: {
    '1': String
    '2': String
  }
}

export interface Resource {
  id?: string
  slug?: string
  thumbnail?: Thumbnails
  title: string
}

export interface Resources {
  [resource: string]: Resource
}

export interface Audience {
  id?: string
  slug?: string
  thumbnail?: Thumbnails
  title: string
}

export interface Audiences {
  [audience: string]: Audience
}

export interface Brand {
  id?: string
  slug?: string
  thumbnail?: Thumbnails
  title: string
}

export interface Brands {
  [brand: string]: Brand
}

export interface Series {
  id: string
  slug: string
  thumbnail: Thumbnails
  title: string
}

export interface Character {
  id: string
  slug: string
  thumbnail: Thumbnails
  name: string
  series: Series
}

export interface Characters {
  [character: string]: Character
}

export interface Category {
  id: string
  slug: string
  thumbnail: Thumbnails
  title: string
}

export interface Categories {
  [category: string]: Category
}

export interface Submit {
  review?: boolean
}

export type Step = 'ARRANGE' | 'AUDIENCE' | 'BRAND' | 'CATEGORY' | 'CHARACTER' | 'REVIEW' | 'SUBMIT'

export type Event =
  | 'thumbnails'
  | 'urls'
  | 'files'
  | 'step'
  | 'content'
  | 'progress'
  | 'characters'
  | 'audience'
  | 'brand'
  | 'categories'
  | 'submit'
  | 'cleanup'
  | 'isInReview'

export interface State {
  thumbnails: Thumbnails
  files: UppyFile[]
  urls: Urls
  step: Step | null
  content: Content[]
  progress: Progress
  brand: string
  audience: string
  characters: Characters
  categories: Categories
  submit: Submit
  isInReview: boolean
  cleanup: () => void
}

export interface Action {
  type: Event

  // Type hinted as "any" but its actually any value in "State" or state itself
  value: {}

  // Will remove the value if true
  remove?: boolean

  // Will remove all values if true
  clear?: boolean
}

export type Dispatch = (action: Action) => void
