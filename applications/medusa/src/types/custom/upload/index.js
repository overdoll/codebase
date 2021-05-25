/**
 * @flow
 */

export type Thumbnails = {
  [string]: string,
};

export type Urls = {
  [string]: string,
};

export type Progress = {
  [string]: {
    '1': String,
    '2': String,
  },
};

export type Artist = {
  id?: string,
  username?: string,
};

export type Media = {
  id: string,
  title: string,
  thumbnail: ?string,
  request?: boolean,
};

export type Character = {
  id: string,
  name: string,
  thumbnail: string,
  request?: boolean,
  media: Media,
};

export type Characters = {
  [string]: Character,
};

export type Category = {
  id: string,
  title: string,
  thumbnail: string,
};

export type Categories = {
  [string]: Category,
};

export type Submit = {
  review?: boolean,
};

export type Step = 'REVIEW' | 'ARRANGE' | 'FINISH' | 'TAG';

export type Event =
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

export type State = {
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

export type Action = {
  type: Event,

  // Type hinted as "any" but its actually any value in "State" or state itself
  value: any,

  // Will remove the value if true
  remove?: boolean,
};

export type Dispatch = {
  (action: Action): void,
};
