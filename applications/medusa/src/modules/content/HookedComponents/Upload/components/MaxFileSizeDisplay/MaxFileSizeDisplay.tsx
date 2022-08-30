import { Heading, HStack } from '@chakra-ui/react'
import { UppyType } from '../../types'
import { Icon } from '../../../../PageLayout'
import { UploadSize } from '@//:assets/icons'

interface Props {
  uppy: UppyType
}

export default function MaxFileSizeDisplay ({
  uppy
}: Props): JSX.Element {
  const { restrictions } = uppy.opts

  const maxFileSize = restrictions.maxFileSize >= 1073741824 ? (restrictions.maxFileSize / 1073741824) : (restrictions.maxFileSize / 1048576)

  const fileSizeType = restrictions.maxFileSize >= 1073741824 ? 'GB' : 'MB'

  return (
    <HStack align='flex-end' spacing={2}>
      <Icon icon={UploadSize} w={6} h={6} fill='gray.200' />
      <Heading fontSize='md' color='gray.200'>
        {maxFileSize} {fileSizeType}
      </Heading>
    </HStack>
  )
}
