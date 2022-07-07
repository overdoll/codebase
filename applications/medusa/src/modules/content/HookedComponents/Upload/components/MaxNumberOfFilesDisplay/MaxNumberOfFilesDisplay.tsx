import { Heading, HStack } from '@chakra-ui/react'
import { UppyType } from '../../types'
import { Icon } from '../../../../PageLayout'
import { UploadMultiple } from '@//:assets/icons'

interface Props {
  uppy: UppyType
}

export default function MaxNumberOfFilesDisplay ({
  uppy
}: Props): JSX.Element {
  const { restrictions } = uppy.opts

  const numberOfFiles = restrictions.maxNumberOfFiles

  return (
    <HStack align='flex-end' spacing={1}>
      <Icon icon={UploadMultiple} w={6} h={6} fill='gray.200' />
      <Heading fontSize='md' color='gray.200'>
        x{numberOfFiles}
      </Heading>
    </HStack>
  )
}
