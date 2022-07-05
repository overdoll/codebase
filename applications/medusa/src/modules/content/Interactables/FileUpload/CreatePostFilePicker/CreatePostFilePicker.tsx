import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { Icon, PostPlaceholder } from '../../../PageLayout'
import { Uppy } from '@uppy/core'
import DragOverFileInput from '../DragOverFileInput/DragOverFileInput'
import { ClickableTile } from '../../../ContentSelection'
import { FileUpload } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import AllowedFileTypesDisplay from '../AllowedFileTypesDisplay/AllowedFileTypesDisplay'
import { UPLOAD_ALLOWED_FILE_TYPES } from '../../../../constants/upload'
import FilePicker from '../FilePicker/FilePicker'

interface Props {
  uppy: Uppy
}

export default function CreatePostFilePicker ({
  uppy
}: Props): JSX.Element {
  return (
    <FilePicker uppy={uppy}>
      <DragOverFileInput uppy={uppy}>
        <ClickableTile p={0}>
          <PostPlaceholder>
            <Stack align='center' w='100%' p={2} spacing={4}>
              <Flex borderRadius='xl' bg='teal.300' p={4}>
                <Icon
                  w={10}
                  h={10}
                  icon={FileUpload}
                  fill='teal.100'
                />
              </Flex>
              <Box>
                <Heading color='gray.00' fontSize='4xl'>
                  <Trans>
                    Upload Files
                  </Trans>
                </Heading>
                <Heading fontSize='md' color='gray.200'>
                  <Trans>
                    Upload one or more files by dragging and dropping them or by tapping here
                  </Trans>
                </Heading>
              </Box>
              <AllowedFileTypesDisplay fileTypes={UPLOAD_ALLOWED_FILE_TYPES} />
            </Stack>
          </PostPlaceholder>
        </ClickableTile>
      </DragOverFileInput>
    </FilePicker>
  )
}
