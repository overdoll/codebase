import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '../../../../PageLayout'
import { Uppy } from '@uppy/core'
import { ClickableTile } from '../../../../ContentSelection'
import { FileUpload } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import AllowedFileTypesDisplay from '../AllowedFileTypesDisplay/AllowedFileTypesDisplay'
import ClickFileInput from '../ClickFileInput/ClickFileInput'
import DragDropFileInput from '../DragDropFileInput/DragDropFileInput'
import MaxFileSizeDisplay from '../MaxFileSizeDisplay/MaxFileSizeDisplay'

interface Props {
  uppy: Uppy
}

export default function GenericFilePicker ({
  uppy
}: Props): JSX.Element {
  return (
    <ClickFileInput uppy={uppy}>
      <DragDropFileInput uppy={uppy}>
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
            <HStack justify='space-between'>
              <MaxFileSizeDisplay uppy={uppy} />
              <AllowedFileTypesDisplay uppy={uppy} />
            </HStack>
          </LargeBackgroundBox>
        </ClickableTile>
      </DragDropFileInput>
    </ClickFileInput>
  )
}
