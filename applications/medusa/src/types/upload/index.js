// @flow

type Thumbnails = {
  [string]: string,
};

type Urls = {
  [string]: string,
};

type Progress = {
  [string]: {
    '1': String,
    '2': String,
  },
};

type Artist = {
  id?: string,
  username?: string,
};

type Characters = {
  [string]: {
    id: string,
    name: string,
    thumbnail: string,
    request?: boolean,
    media: {
      id: string,
      title: string,
      thumbnail: ?string,
      request?: boolean,
    },
  },
};

type Categories = {
  [string]: {
    id: string,
    title: string,
    thumbnail: string,
  },
};

type Submit = {
  review?: boolean,
};

type Step = 'REVIEW' | 'ARRANGE' | 'FINISH' | 'TAG';

type Event =
  | 'thumbnails'
  | 'urls'
  | 'files'
  | 'step'
  | 'progress'
  | 'characters'
  | 'artist'
  | 'categories'
  | 'submit'
  | 'cleanup'
  | 'arrange_files';

type State = {
  thumbnails: Thumbnails,
  files: Array<any>,
  urls: Urls,
  step: ?Step,
  progress: Progress,
  artist: Artist,
  characters: Characters,
  categories: Categories,
  submit: Submit,
  cleanup: any,
};

type Action = {
  type: Event,

  // Type hinted as "any" but its actually any value in "State" or state itself
  value: any,

  // Will remove the value if true
  remove?: boolean,
};

type Dispatch = {
  (action: Action): void,
};

export type {
  State,
  Thumbnails,
  Urls,
  Progress,
  Artist,
  Characters,
  Step,
  Event,
  Action,
  Dispatch,
};
