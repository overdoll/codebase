/**
 * @flow
 */
import type { Node } from 'react';
import TagArtists from './components/sections/artists/TagArtists';
import TagCharacters from './components/sections/characters/TagCharacters';
import TagCategories from './components/sections/categories/TagCategories';
import Thumbnail from '../arrange/components/thumbnail/Thumbnail';
import type { Dispatch, State } from '@//:types/upload';
import { useTranslation } from 'react-i18next';
import {
  Flex,
  Heading,
  Text,
  HStack,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';

type Props = {
  dispatch: Dispatch,
  state: State,
  disabled: boolean,
};

export default function Tag({ state, dispatch, disabled }: Props): Node {
  const [t] = useTranslation('upload');

  return (
    <Flex direction="column" w="100%">
      <Heading fontSize="3xl" color="gray.00" mb={2}>
        {t('tag.header')}
      </Heading>
      <Text fontSize="lg" color="gray.100">
        {t('tag.subheader')}
      </Text>
      <HStack flexWrap="nowrap" overflowX="auto" mt={6} mb={6}>
        {state.files.map(file => {
          const thumbnail = state.thumbnails[file.id];
          const prog = state.progress[file.id];
          return (
            <Flex
              key={file.id}
              w={130}
              h={150}
              objectFit="cover"
              flex="0 0 auto"
            >
              <Thumbnail thumbnail={thumbnail} progress={prog} />
            </Flex>
          );
        })}
      </HStack>

      <Stack>
        <TagArtists dispatch={dispatch} state={state} />
        <TagCharacters dispatch={dispatch} state={state} />
        <TagCategories dispatch={dispatch} state={state} />
      </Stack>
      {disabled && (
        <Alert mt={4} borderRadius={5}>
          <AlertIcon />
          {t('tag.notice')}
          <AlertDescription />
        </Alert>
      )}
    </Flex>
  );
}
