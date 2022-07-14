import { Flex, Heading, Stack } from '@chakra-ui/react'
import { Icon, PostPlaceholder } from '../../../../PageLayout'
import { Uppy } from '@uppy/core'
import { FileUpload } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import AllowedFileTypesDisplay from '../AllowedFileTypesDisplay/AllowedFileTypesDisplay'
import MaxNumberOfFilesDisplay from '../MaxNumberOfFilesDisplay/MaxNumberOfFilesDisplay'
import MaxFileSizeDisplay from '../MaxFileSizeDisplay/MaxFileSizeDisplay'
import FileInputOverlay from '../FileInputOverlay/FileInputOverlay'
import UploadActionsDisplay from '../UploadActionsDisplay/UploadActionsDisplay'

interface Props {
  uppy: Uppy
}

export default function CreatePostNewFilePicker ({
  uppy
}: Props): JSX.Element {
  return (
    <FileInputOverlay uppy={uppy}>
      <PostPlaceholder>
        <Stack align='center' justify='center' w='100%' p={2} spacing={4}>
          <Flex borderRadius='xl' bg='teal.300' p={4}>
            <Icon
              w={10}
              h={10}
              icon={FileUpload}
              fill='teal.100'
            />
          </Flex>
          <Stack spacing={2} align='center'>
            <Heading textAlign='center' color='gray.00' fontSize='4xl'>
              <Trans>
                Upload Files
              </Trans>
            </Heading>
            <UploadActionsDisplay direction='row' />
          </Stack>
          <AllowedFileTypesDisplay uppy={uppy} />
          <MaxNumberOfFilesDisplay uppy={uppy} />
          <MaxFileSizeDisplay uppy={uppy} />
        </Stack>
      </PostPlaceholder>
    </FileInputOverlay>
  )
}
