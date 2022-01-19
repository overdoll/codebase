import UppyInstance from './hooks/uppy/Uppy'
import type { Uppy, UppyFile } from '@uppy/core'
import { useEffect, useRef, useState } from 'react'
import { CloseButton, Flex, Heading, HStack, Progress, Skeleton, useToast } from '@chakra-ui/react'
import { ClickableBox, LargeBackgroundBox } from '../../PageLayout'
import FilePicker from '../../../../client/domain/ManageClub/pages/CreatePost/components/FilePicker/FilePicker'
import DragOverFileInput from '../../../../client/domain/ManageClub/pages/CreatePost/components/DragOverFileInput/DragOverFileInput'
import { FileUpload } from '@//:assets/icons/interface'
import Icon from '../../PageLayout/Flair/Icon/Icon'
import { Trans } from '@lingui/macro'
import SuspenseImage from '../../../operations/SuspenseImage'

interface Props {
  onCompleted: (id) => void
  onCancelled?: () => void
  isDisabled?: boolean
}

export default function SingleFileImageUpload ({
  onCompleted,
  onCancelled,
  isDisabled = false
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
    onCompleted(undefined)
    onCancelled?.()
    uppy?.reset()
  }

  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      const url = response.uploadURL as string
      const fileId = url.substring(url.lastIndexOf('/') + 1)
      setResponse(fileId)
      setFile(file)
      setFileUrl(url)
      onCompleted(fileId)
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
        title: message,
        isClosable: true
      })
    })
  }, [uppy])

  if (file == null) {
    return (
      <FilePicker uppy={uppy}>
        <DragOverFileInput hasText={false} uppy={uppy}>
          <LargeBackgroundBox h={16} w='100%'>
            <HStack h='100%' align='center' justify='center'>
              <Icon
                w={6}
                h={6}
                icon={FileUpload}
                fill='gray.100'
                mr={2}
              />
              <Heading fontSize='md' color='gray.100'>
                <Trans>
                  Drag and drop or tap to upload
                </Trans>
              </Heading>
            </HStack>
          </LargeBackgroundBox>
        </DragOverFileInput>
      </FilePicker>
    )
  }

  if (response != null) {
    return (
      <LargeBackgroundBox p={1} h={16} w='100%'>
        <Flex h='100%' align='center' justify='center'>
          <ClickableBox w='auto' borderRadius='md' overflow='hidden' p={0} h='100%' onClick={removeUpload}>
            <SuspenseImage h='100%' src={fileUrl} fallback={<Skeleton />} />
          </ClickableBox>
        </Flex>
      </LargeBackgroundBox>
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
        <CloseButton isDisabled={isDisabled} onClick={removeUpload} />
      </Flex>
    </LargeBackgroundBox>
  )
}
