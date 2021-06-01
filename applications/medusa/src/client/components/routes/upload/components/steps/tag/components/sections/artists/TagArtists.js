/**
 * @flow
 */
import type { Node } from 'react'
import Artists from './query/Artists'
import type { Dispatch, State } from '@//:types/upload'
import { EVENTS } from '../../../../../../constants/constants'
import Section from '../../section/Section'
import { Tag, TagLabel, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  dispatch: Dispatch,
  state: State,
};

export default function TagArtists ({ state, dispatch }: Props): Node {
  const [t] = useTranslation('upload')

  // For selecting an artist, we immediately close since we should only have 1
  const onSelect = (artist, onClose) => {
    dispatch({ type: EVENTS.TAG_ARTIST, value: artist })
    onClose()
  }

  return (
    <Section
      label={t('tag.artist.label')}
      searchTitle={t('tag.artist.search')}
      search={(args, onClose) => (
        <Artists
          args={args}
          selected={state.artist}
          onSelect={artist => onSelect(artist, onClose)}
        />
      )}
      title={t('tag.artist.label')}
      count={Object.keys(state.artist).length !== 0 ? 1 : 0}
    >
      {Object.keys(state.artist).length !== 0
        ? (
          <Tag size='lg' variant='solid' colorScheme='teal' borderRadius='full'>
            <TagLabel>{state.artist.username}</TagLabel>
          </Tag>
          )
        : (
          <Text as='i' fontSize='md'>
            {t('tag.artist.empty')}
          </Text>
          )}
    </Section>
  )
}
