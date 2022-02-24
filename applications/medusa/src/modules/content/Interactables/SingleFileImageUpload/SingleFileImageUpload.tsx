import UppyInstance from './hooks/uppy/Uppy'
import type { Uppy, UppyFile } from '@uppy/core'
import { useEffect, useRef, useState } from 'react'
import { Flex, Progress, Stack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '../../PageLayout'
import FilePicker from '../../../../client/domain/ManageClub/pages/CreatePost/components/FilePicker/FilePicker'
import DragOverFileInput
  from '../../../../client/domain/ManageClub/pages/CreatePost/components/DragOverFileInput/DragOverFileInput'
import { FileUpload, RemoveCross } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import CloseButton from '../../ThemeComponents/CloseButton/CloseButton'
import { useToast } from '@//:modules/content/ThemeComponents'
import Button from '../../../form/Button/Button'

interface Props {
  onChange: (id) => void
  isInvalid: boolean
  size?: string
  isLoading?: boolean
}

export default function SingleFileImageUpload ({
  onChange,
  isInvalid,
  size = 'sm',
  isLoading = false
}: Props): JSX.Element {
  const initialUppy = useRef<Uppy | undefined>(undefined)
  if (initialUppy.current === undefined) {
    initialUppy.current = UppyInstance
  }

  const uppy = initialUppy.current

  const [progress, setProgress] = useState<number | undefined>(undefined)

  const [file, setFile] = useState<UppyFile | undefined>(undefined)

  const [response, setResponse] = useState<string | undefined>(undefined)

  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)

  const notify = useToast()

  const removeUpload = (): void => {
    setResponse(undefined)
    setFile(undefined)
    setProgress(undefined)
    onChange('')
    uppy?.reset()
  }

  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      const url = response.uploadURL as string
      const fileId = url.substring(url.lastIndexOf('/') + 1)
      setResponse(fileId)
      setFile(file)
      setFileUrl(url)
      onChange(fileId)
      setProgress(undefined)
    })
  }, [uppy])

  useEffect(() => {
    uppy.on('upload-progress', (file, progress) => {
      setProgress(progress.bytesUploaded / progress.bytesTotal)
    })
  }, [uppy])

  useEffect(() => {
    uppy.on('file-added', file => {
      setFile(file)
    })
  }, [uppy])

  // Event for errors
  useEffect(() => {
    uppy.on('info-visible', () => {
      const info = uppy.getState().info

      if (info == null) return

      const message = `${info.message}`

      notify({
        status: 'error',
        title: message
      })
    })
  }, [uppy])

  if (file == null) {
    return (
      <FilePicker uppy={uppy}>
        <DragOverFileInput hasText={false} uppy={uppy}>
          <Button
            colorScheme={isInvalid ? 'orange' : 'gray'}
            leftIcon={(<Icon
              w={4}
              h={4}
              icon={FileUpload}
              fill='inherit'
                       />)}
            size={size}
            w='100%'
            isLoading={isLoading}
          >
            <Trans>
              Drag and drop or tap to upload
            </Trans>
          </Button>
        </DragOverFileInput>
      </FilePicker>
    )
  }

  if (response != null) {
    return (
      <Stack w='100%' spacing={2}>
        <Button
          colorScheme={isInvalid ? 'orange' : 'gray'}
          leftIcon={(<Icon
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
          ? <Progress
              colorScheme='primary'
              w='100%'
              value={progress}
              size='lg'
              mr={4}
            />
          : <Progress
              colorScheme='primary'
              w='100%'
              value={100}
              size='lg'
              hasStripe
              isAnimated
              mr={4}
            />}
        <CloseButton size='sm' isDisabled={isLoading} onClick={removeUpload} />
      </Flex>
    </LargeBackgroundBox>
  )
}
