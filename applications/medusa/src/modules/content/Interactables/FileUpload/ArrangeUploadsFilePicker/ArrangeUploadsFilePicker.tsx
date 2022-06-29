import { Flex, Heading, Stack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '../../../PageLayout'
import { Uppy } from '@uppy/core'
import { ClickableTile } from '../../../ContentSelection'
import { FileUpload } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import AllowedFileTypesDisplay from '../AllowedFileTypesDisplay/AllowedFileTypesDisplay'
import { UPLOAD_ALLOWED_FILE_TYPES } from '../../../../constants/upload'
import FilePicker from '../FilePicker/FilePicker'
import DragOverFileInput from '../DragOverFileInput/DragOverFileInput'

interface Props {
  uppy: Uppy
}

export default function ArrangeUploadsFilePicker ({
  uppy
}: Props): JSX.Element {
  return (
    <FilePicker uppy={uppy}>
      <DragOverFileInput hasText={false} uppy={uppy}>
        <ClickableTile>
          <LargeBackgroundBox w='100%'>
            <Stack spacing={2} align='center' justify='center'>
              <Icon
                w={8}
                h={8}
                icon={FileUpload}
                fill='gray.100'
              />
              <Heading fontSize='lg' color='gray.100'>
                <Trans>
                  Drag and drop or tap to upload
                </Trans>
              </Heading>
            </Stack>
            <Flex justify='flex-end'>
              <AllowedFileTypesDisplay fileTypes={UPLOAD_ALLOWED_FILE_TYPES} />
            </Flex>
          </LargeBackgroundBox>
        </ClickableTile>
      </DragOverFileInput>
    </FilePicker>
  )
}
