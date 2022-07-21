import { Flex, HStack, Stack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '../../../../PageLayout'
import { Uppy } from '@uppy/core'
import { FileUpload } from '@//:assets/icons'
import AllowedFileTypesDisplay from '../AllowedFileTypesDisplay/AllowedFileTypesDisplay'
import MaxFileSizeDisplay from '../MaxFileSizeDisplay/MaxFileSizeDisplay'
import FileInputOverlay from '../FileInputOverlay/FileInputOverlay'
import UploadActionsDisplay from '../UploadActionsDisplay/UploadActionsDisplay'

interface Props {
  uppy: Uppy
}

export default function GenericFilePicker ({
  uppy
}: Props): JSX.Element {
  return (
    <FileInputOverlay uppy={uppy}>
      <LargeBackgroundBox w='100%'>
        <Stack w='100%' align='center' justify='center' spacing={4}>
          <HStack spacing={4} align='center' justify='center'>
            <Flex borderRadius='xl' bg='gray.500' p={3}>
              <Icon
                w={8}
                h={8}
                icon={FileUpload}
                fill='gray.00'
              />
            </Flex>
            <UploadActionsDisplay />
          </HStack>
          <HStack w='100%' justify='space-between' spacing={4}>
            <MaxFileSizeDisplay uppy={uppy} />
            <AllowedFileTypesDisplay uppy={uppy} />
          </HStack>
        </Stack>
      </LargeBackgroundBox>
    </FileInputOverlay>
  )
}
