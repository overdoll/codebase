import type { Uppy } from '@uppy/core'
import { UppyFile } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { CloseButton, HStack, Progress } from '@chakra-ui/react'
import { EVENTS } from '../../../../../../../constants/constants'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  uppy: Uppy
  state: State
  file: UppyFile
  dispatch: Dispatch
  disabled: boolean
}

export default function File ({
  state,
  file,
  dispatch,
  uppy,
  disabled
}: Props): JSX.Element {
  const progress = state.progress[file.id]
  const progressValue: number = ((progress[0] / progress[1]) * 100)
  const url = state.urls[file.id]

  const onRemoveFile = (id: string): void => {
    uppy.removeFile(id)
    dispatch({
      type: EVENTS.FILES,
      value: { id: id },
      remove: true
    })
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

  const FileMessage = (): JSX.Element => {
    if (url != null) {
      // Show a "processing" indicator when files are done uploading
      return (
        <>
          <Progress
            colorScheme='primary'
            w='100%'
            value={100}
            size='md'
            hasStripe
            isAnimated
          />
        </>
      )
    }
    // Show regular progress indicator
    return (
      <Progress
        colorScheme='primary'
        w='100%'
        value={progressValue ?? 0}
        size='md'
        isIndeterminate={progress != null}
      />
    )
  }

  return (
    <LargeBackgroundBox pl={4}>
      <HStack spacing={4}>
        <FileMessage />
        <CloseButton isDisabled={disabled ?? url} onClick={() => onRemoveFile(file.id)} />
      </HStack>
    </LargeBackgroundBox>
  )
}
