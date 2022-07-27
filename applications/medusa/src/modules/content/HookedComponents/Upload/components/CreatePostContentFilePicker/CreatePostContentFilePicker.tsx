import { Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '../../../../PageLayout'
import { Uppy } from '@uppy/core'
import { AddPlus } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import AllowedFileTypesDisplay from '../AllowedFileTypesDisplay/AllowedFileTypesDisplay'
import MaxFileSizeDisplay from '../MaxFileSizeDisplay/MaxFileSizeDisplay'
import FileInputOverlay from '../FileInputOverlay/FileInputOverlay'
import UploadActionsDisplay from '../UploadActionsDisplay/UploadActionsDisplay'

interface Props {
  uppy: Uppy
}

export default function CreatePostContentFilePicker ({
  uppy
}: Props): JSX.Element {
  return (
    <FileInputOverlay uppy={uppy}>
      <LargeBackgroundBox p={3} w='100%'>
        <Stack w='100%' align='flex-start' justify='center' spacing={4}>
          <HStack spacing={3} align='center' justify='center'>
            <Flex borderRadius='xl' bg='gray.500' p={3}>
              <Icon
                w={5}
                h={5}
                icon={AddPlus}
                fill='gray.100'
              />
            </Flex>
            <Stack spacing={1}>
              <Heading fontSize='2xl' color='gray.100'>
                <Trans>
                  Add Content
                </Trans>
              </Heading>
            </Stack>
          </HStack>
          <HStack w='100%' justify='space-between' spacing={4}>
            <MaxFileSizeDisplay uppy={uppy} />
            <UploadActionsDisplay direction='row' />
            <AllowedFileTypesDisplay uppy={uppy} />
          </HStack>
        </Stack>
      </LargeBackgroundBox>
    </FileInputOverlay>
  )
}
