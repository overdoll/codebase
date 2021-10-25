/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import {
  Flex,
  Text,
  CloseButton,
  Progress,
  HStack,
  Spinner
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { EVENTS } from '../../../../../../../../../../Uploadold/constants/constants'

type Props = {
  uppy: Uppy,
  state: State,
  file: State[files],
  dispatch: Dispatch,
  disabled: boolean,
};

export default function FileUploadProgress ({ state, file, dispatch, uppy, disabled }: Props): Node {
  const [t] = useTranslation('manage')

  const progress = state.progress[file.id]
  const progressValue = progress && (progress[0] / progress[1]) * 100
  const url = state.urls[file.id]

  const onRemoveFile = (id) => {
    uppy.removeFile(id)
    dispatch({ type: EVENTS.FILES, value: { id: id }, remove: true })
    dispatch({
      type: EVENTS.PROGRESS,
      value: { [id]: state.progress[id] },
      remove: true
    })
    dispatch({
      type: EVENTS.URLS,
      value: { [id]: state.urls[id] },
      remove: true
    })
  }

  const FileMessage = () => {
    if (url) {
      // Show a "processing" placeholder when files are done uploading
      return (
        <>
          <Flex align='center' w='100%'>
            <Spinner color='primary.500' size='md' />
            <Text ml={3} color='gray.100' fontSize='md'>
              {t('posts.flow.steps.arrange.uploader.processing.in_progress')}
            </Text>
          </Flex>
        </>
      )
    }
    // Show a normal progress indicator
    return (
      <Progress
        colorScheme='primary' w='100%' value={progressValue || 0} size='md'
        isIndeterminate={!progress}
      />
    )
  }

  return (
    <HStack py={2} bg='gray.800' px={4} borderRadius='md' spacing={4}>
      <FileMessage />
      <CloseButton isDisabled={disabled} onClick={() => onRemoveFile(file.id)} />
    </HStack>
  )
}
