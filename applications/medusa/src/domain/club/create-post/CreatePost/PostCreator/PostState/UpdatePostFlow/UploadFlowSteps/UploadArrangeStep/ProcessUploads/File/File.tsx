import { UppyFile } from '@uppy/core'
import { HStack, Progress } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'

interface Props {
  file: UppyFile
  disabled: boolean
}

export default function File ({
  file,
  disabled
}: Props): JSX.Element {
  const uppy = useUppyContext()
  const {
    state
  } = useSequenceContext()

  const { i18n } = useLingui()

  const progress = state.progress[file.id]
  const progressValue = progress != null &&
    ((progress[0] / progress[1]) * 100)
  const url = state.urls[file.id]

  const onRemoveFile = (id: string): void => {
    uppy.removeFile(id)
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
        value={progressValue !== false ? progressValue : undefined}
        size='md'
        isIndeterminate={progress != null}
      />
    )
  }

  return (
    <LargeBackgroundBox pl={4}>
      <HStack spacing={4}>
        <FileMessage />
        <CloseButton
          size='md'
          aria-label={i18n._(t`Remove File`)}
          isDisabled={disabled ?? url}
          onClick={() => onRemoveFile(file.id)}
        />
      </HStack>
    </LargeBackgroundBox>
  )
}