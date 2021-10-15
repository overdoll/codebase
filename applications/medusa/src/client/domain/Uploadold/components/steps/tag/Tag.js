/**
 * @flow
 */
import type { Node } from 'react'
import TagArtists from './components/sections/artists/TagArtists'
import TagCharacters from './components/sections/characters/TagCharacters'
import TagCategories from './components/sections/categories/TagCategories'
import type { Dispatch, State } from '@//:types/upload'
import { useTranslation } from 'react-i18next'
import {
  Flex,
  Heading,
  Text,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription, Accordion
} from '@chakra-ui/react'
import XScrollContainer from './components/scrollable/container/XScrollContainer'

type Props = {
  dispatch: Dispatch,
  state: State,
  disabled: boolean,
};

export default function Tag ({ state, dispatch, disabled }: Props): Node {
  const [t] = useTranslation('upload')

  return (
    <Flex direction='column'>
      <Heading fontSize='3xl' color='gray.00' mb={2}>
        {t('tag.header')}
      </Heading>
      <Text fontSize='lg' color='gray.100'>
        {t('tag.subheader')}
      </Text>
      <XScrollContainer
        thumbnails={state.thumbnails}
        progress={state.progress}
        files={state.files}
      />

      <Accordion allowToggle>
        <Stack>
          <TagArtists dispatch={dispatch} state={state} />
          <TagCharacters dispatch={dispatch} state={state} />
          <TagCategories dispatch={dispatch} state={state} />

        </Stack>
      </Accordion>
      {disabled && (
        <Alert mt={4} mb={4} borderRadius={5}>
          <AlertIcon />
          {t('tag.notice')}
          <AlertDescription />
        </Alert>
      )}
    </Flex>
  )
}
