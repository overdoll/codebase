/**
 * @flow
 */
import { UppyFile } from '@uppy/core'

export type Urls = {
  [string]: {
    url: string,
    mimeType: string,
  },
};

export type Thumbnails = {
  [string]: {
    id: string,
    type: string,
    urls: Urls
  },
};

export type Progress = {
  [string]: {
    '1': String,
    '2': String,
  },
};

export type Audience = {
  id?: string,
  slug?: string,
  thumbnail?: Thumbnails,
  title: string,
}

export type Audiences = {
  [string]: Audience
}

export type Brand = {
  id?: string,
  slug?: string,
  thumbnail?: Thumbnails,
  title: string,
};

export type Brands = {
  [string]: Brand
}

export type Series = {
  id: string,
  slug: string,
  thumbnail: Thumbnails,
  title: string,
};

export type Character = {
  id: string,
  slug: string,
  thumbnail: Thumbnails,
  name: string,
  series: Series
};

export type Characters = {
  [string]: Character,
};

export type Category = {
  id: string,
  slug: string,
  thumbnail: Thumbnails,
  title: string,
};

export type Categories = {
  [string]: Category,
};

export type Submit = {
  review?: boolean,
};

export type Step = 'ARRANGE' | 'AUDIENCE' | 'BRAND' | 'CATEGORY' | 'CHARACTER' | 'REVIEW' | 'SUBMIT';

export type Event =
  | 'thumbnails'
  | 'urls'
  | 'files'
  | 'step'
  | 'content'
  | 'progress'
  | 'characters'
  | 'audiences'
  | 'brands'
  | 'categories'
  | 'submit'
  | 'cleanup'
  | 'arrange_files';

export type State = {
  thumbnails: Thumbnails,
  files: Array<UppyFile>,
  urls: Urls,
  step: ?Step,
  content: Array<string>,
  progress: Progress,
  brands: Brands,
  characters: Characters,
  categories: Categories,
  submit: Submit,
  cleanup: () => void,
};

export type Action = {
  type: Event,

  // Type hinted as "any" but its actually any value in "State" or state itself
  value: {},

  // Will remove the value if true
  remove?: boolean,
};

export type Dispatch = {
  (action: Action): void,
};
