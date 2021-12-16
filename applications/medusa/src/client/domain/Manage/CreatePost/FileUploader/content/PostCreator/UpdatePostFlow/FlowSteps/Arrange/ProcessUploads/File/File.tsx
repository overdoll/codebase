/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import { UppyFile } from '@uppy/core'
import type { Dispatch, State } from '../../../../../../../../../../../../types/upload'
import { CloseButton, HStack, Progress } from '@chakra-ui/react'
import { EVENTS } from '../../../../../../../constants/constants'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'

type Props = {
  uppy: Uppy,
  state: State,
  file: Array<UppyFile>,
  dispatch: Dispatch,
  disabled: boolean,
};

export default function File ({ state, file, dispatch, uppy, disabled }: Props): Node {
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
      // Show a "processing" indicator when files are done uploading
      return (
        <>
          <Progress
            colorScheme='primary' w='100%' value={100} size='md' hasStripe
            isAnimated
          />
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
    <LargeBackgroundBox pl={4}>
      <HStack spacing={4}>
        <FileMessage />
        <CloseButton isDisabled={disabled || url} onClick={() => onRemoveFile(file.id)} />
      </HStack>
    </LargeBackgroundBox>
  )
}
