import UppyInstance from './hooks/uppy/Uppy'
import type { Uppy, UppyFile } from '@uppy/core'
import { useEffect, useRef, useState } from 'react'
import { Flex, Progress, Stack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '../../../PageLayout'
import { RemoveCross } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import CloseButton from '../../../ThemeComponents/CloseButton/CloseButton'
import { useToast } from '../../../ThemeComponents'
import Button from '../../../../form/Button/Button'
import GenericFilePicker from '../GenericFilePicker/GenericFilePicker'
import { CLUB_ALLOWED_FILE_TYPES } from '../../../../constants/upload'

interface Props {
  onChange: (id) => void
  isInvalid: boolean
  size?: string
  isLoading?: boolean
}

export default function SingleFileImageUpload ({
  onChange,
  isInvalid,
  isLoading = false,
  size
}: Props): JSX.Element {
  const initialUppy = useRef<Uppy | undefined>(undefined)
  if (initialUppy.current === undefined) {
    initialUppy.current = UppyInstance
  }

  const uppy = initialUppy.current

  const [progress, setProgress] = useState<number | undefined>(undefined)

  const [file, setFile] = useState<UppyFile | undefined>(undefined)

  const [response, setResponse] = useState<string | undefined>(undefined)

  const notify = useToast()

  const removeUpload = (): void => {
    setResponse(undefined)
    setFile(undefined)
    setProgress(undefined)
    onChange('')
    uppy?.reset()
  }

  useEffect(() => {
    const callBackFn = (file, response): void => {
      const url = response.uploadURL as string
      const fileId = url.substring(url.lastIndexOf('/') + 1)
      setResponse(fileId)
      setFile(file)
      onChange(fileId)
      setProgress(undefined)
    }

    uppy.on('upload-success', callBackFn)

    return () => {
      uppy.off('upload-success', callBackFn)
    }
  }, [uppy])

  useEffect(() => {
    const callBackFn = (file, progress): void => {
      setProgress(progress.bytesUploaded / progress.bytesTotal)
    }

    uppy.on('upload-progress', callBackFn)

    return () => {
      uppy.off('upload-progress', callBackFn)
    }
  }, [uppy])

  useEffect(() => {
    const callBackFn = (file): void => {
      setFile(file)
    }

    uppy.on('file-added', callBackFn)

    return () => {
      uppy.off('file-added', callBackFn)
    }
  }, [uppy])

  // Event for errors
  useEffect(() => {
    const callBackFn = (): void => {
      const info = uppy.getState().info

      if (info == null) return

      const message = `${info.message}`

      notify({
        status: 'error',
        title: message
      })
    }

    uppy.on('info-visible', callBackFn)

    return () => {
      uppy.off('info-visible', callBackFn)
    }
  }, [uppy])

  if (file == null) {
    return (
      <GenericFilePicker uppy={uppy} fileTypes={CLUB_ALLOWED_FILE_TYPES} />
    )
  }

  if (response != null) {
    return (
      <Stack w='100%' spacing={2}>
        <Button
          colorScheme={isInvalid ? 'orange' : 'gray'}
          leftIcon={(
            <Icon
              w={4}
              h={4}
              icon={RemoveCross}
              fill={isInvalid ? 'orange.900' : 'gray.100'}
            />)}
          onClick={removeUpload}
          size={size}
          w='100%'
          isLoading={isLoading}
        >
          <Trans>
            Remove Upload
          </Trans>
        </Button>
      </Stack>
    )
  }

  return (
    <LargeBackgroundBox h={16} w='100%'>
      <Flex align='center' justify='space-between'>
        {progress != null
          ? (
            <Progress
              colorScheme='primary'
              w='100%'
              value={((progress ?? 0) * 100)}
              size='lg'
              mr={4}
            />)
          : (
            <Progress
              colorScheme='primary'
              w='100%'
              value={100}
              size='lg'
              hasStripe
              isAnimated
              mr={4}
            />)}
        <CloseButton size='sm' isDisabled={isLoading} onClick={removeUpload} />
      </Flex>
    </LargeBackgroundBox>
  )
}
