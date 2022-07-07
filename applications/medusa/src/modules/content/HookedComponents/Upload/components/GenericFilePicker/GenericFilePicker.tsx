import { Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '../../../../PageLayout'
import { Uppy } from '@uppy/core'
import { DownloadArrow, FileUpload, TapButton } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import AllowedFileTypesDisplay from '../AllowedFileTypesDisplay/AllowedFileTypesDisplay'
import MaxFileSizeDisplay from '../MaxFileSizeDisplay/MaxFileSizeDisplay'
import FileInputOverlay from '../FileInputOverlay/FileInputOverlay'

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
            <Stack spacing={2}>
              <HStack spacing={1}>
                <Icon
                  w={5}
                  h={5}
                  icon={DownloadArrow}
                  fill='gray.200'
                />
                <Heading fontSize='md' color='gray.200'>
                  <Trans>
                    Drop
                  </Trans>
                </Heading>
              </HStack>
              <HStack spacing={1}>
                <Icon
                  w={5}
                  h={5}
                  icon={TapButton}
                  fill='gray.200'
                />
                <Heading fontSize='md' color='gray.200'>
                  <Trans>
                    Tap
                  </Trans>
                </Heading>
              </HStack>
            </Stack>
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
