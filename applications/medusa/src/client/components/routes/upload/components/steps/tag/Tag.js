/**
 * @flow
 */
import type { Node } from 'react';
import TagArtists from './components/sections/artists/TagArtists';
import TagCharacters from './components/sections/characters/TagCharacters';
import TagCategories from './components/sections/categories/TagCategories';
import Thumbnail from '../arrange/components/thumbnail/Thumbnail';
import Frame from '@//:modules/content/frame/Frame';
import Heading from '@//:modules/typography/heading/Heading';
import Text from '@//:modules/typography/text/Text';
import XScrollContainer from './components/scrollable/container/XScrollContainer';
import type { Dispatch, State } from '@//:types/upload';
import { useTranslation } from 'react-i18next';
import ScrollContent from './components/scrollable/content/ScrollContent';
import { createPortal } from 'react-dom';

type Props = {
  dispatch: Dispatch,
  state: State,
  disabled: boolean,
};

export default function Tag({ state, dispatch, disabled }: Props): Node {
  const [t] = useTranslation('upload');
  return (
    <Frame>
      <Heading sx={{ textAlign: 'left', fontSize: 5, mb: 2, mt: 2 }}>
        {t('tag.header')}
      </Heading>
      <Text sx={{ textAlign: 'left', fontSize: 2, color: 'neutral.100' }}>
        {t('tag.subheader')}
      </Text>
      <div sx={{ display: 'flex', flexDirection: 'column' }}>
        <XScrollContainer>
          {state.files.map(file => {
            const thumbnail = state.thumbnails[file.id];
            const prog = state.progress[file.id];

            return (
              <ScrollContent
                key={file.id}
                sx={{
                  width: '130px',
                  height: '150px',
                }}
              >
                <Thumbnail thumbnail={thumbnail} progress={prog} />
              </ScrollContent>
            );
          })}
        </XScrollContainer>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
