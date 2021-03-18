/**
 * @flow
 */
import type { Node } from 'react';
import TagArtists from './components/sections/artists/TagArtists';
import TagCharacters from './components/sections/characters/TagCharacters';
import TagCategories from './components/sections/categories/TagCategories';

type Props = {
  dispatch: any,
  state: any,
};

export default function Tag({ state, dispatch }: Props): Node {
  return (
    <>
      <div sx={{ display: 'flex' }}>
        {state.files.map(file => {
          const thumbnail = state.thumbnails[file.id];
          const prog = state.progress[file.id];

          return (
            <div key={file.id}>
              {thumbnail ? <img alt="thumbnail" src={thumbnail} /> : 'no thumb'}
              {prog ? `${prog['0']}/${prog['1']}` : 'waiting'}
            </div>
          );
        })}
      </div>
      <TagArtists state={state} dispatch={dispatch} />
      <TagCharacters dispatch={dispatch} state={state} />
      <TagCategories dispatch={dispatch} state={state} />
    </>
  );
}
