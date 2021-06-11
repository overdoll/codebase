/**
 * @flow
 */
import type { Node } from 'react'
import type { State } from '@//:types/upload'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Heading,
  Text
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import FullPost from '../../../../../components/FullPost/FullPost'

type Props = {
  state: State,
  disabled: boolean,
};

export default function Review ({ state, disabled }: Props): Node {
  const [t] = useTranslation('upload')

  return (
    <>
      <Heading fontSize='3xl' color='gray.00'>
        {t('review.header')}
      </Heading>
      <Text fontSize='lg' mt={2} color='gray.100'>
        {t('review.subheader')}
      </Text>
      <FullPost
        artist={state.artist} files={state.files} urls={state.urls} characters={state.characters}
        categories={state.categories} mt={2} disableContext
      />
      <>
        {disabled && (
          <Alert mt={4} borderRadius={5}>
            <AlertIcon />
            {t('review.notice')}
            <AlertDescription />
          </Alert>
        )}
      </>
    </>
  )
}
