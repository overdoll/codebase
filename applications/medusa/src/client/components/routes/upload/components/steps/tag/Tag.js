/**
 * @flow
 */
import type { Node } from 'react';
import TagArtists from './components/sections/artists/TagArtists';
import TagCharacters from './components/sections/characters/TagCharacters';
import TagCategories from './components/sections/categories/TagCategories';
import Thumbnail from '../arrange/components/thumbnail/Thumbnail';
import Frame from '@//:modules/content/frame/Frame';
import type { Dispatch, State } from '@//:types/upload';

type Props = {
  dispatch: Dispatch,
  state: State,
  disabled: boolean,
};

export default function Tag({ state, dispatch, disabled }: Props): Node {
  return (
    <Frame>
      <div sx={{ display: 'flex', flexDirection: 'column' }}>
        <div
          sx={{
            display: 'flex',
            height: '30%',
            width: 'fill',
            overflow: 'visible',
            flexDirection: 'row',
          }}
        >
          {state.files.map(file => {
            const thumbnail = state.thumbnails[file.id];
            const prog = state.progress[file.id];

            return (
              <div
                key={file.id}
                sx={{
                  height: 'fill',
                  width: '100px',
                  margin: 2,
                }}
              >
                <Thumbnail
                  thumbnail={thumbnail}
                  progress={prog}
                  sx={{ height: 'fill', borderRadius: 5 }}
                />
              </div>
            );
          })}
        </div>
        <div sx={{ display: 'flex', flexDirection: 'column', height: '70%' }}>
          <TagArtists state={state} dispatch={dispatch} />
          <TagCharacters dispatch={dispatch} state={state} />
          <TagCategories dispatch={dispatch} state={state} />
          {disabled && (
            <div>
              you need to select an artist, 1 character and at least 3
              categories
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
}
