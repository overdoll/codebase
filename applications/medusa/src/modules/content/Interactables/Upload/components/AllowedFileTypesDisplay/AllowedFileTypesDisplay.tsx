import { HStack } from '@chakra-ui/react'
import { FileMp4, FilePng } from '@//:assets/logos'
import { Icon } from '../../../../PageLayout'
import { UppyType } from '../../types'

interface Props {
  uppy: UppyType
}

const FILE_ICONS = {
  'image/png': FilePng,
  'video/mp4': FileMp4
}

export default function AllowedFileTypesDisplay ({
  uppy
}: Props): JSX.Element {
  const { restrictions } = uppy.opts

  return (
    <HStack spacing={3}>
      {restrictions.allowedFileTypes.map((item, index) => (
        <Icon key={index} icon={FILE_ICONS[item]} w={6} h={6} fill='gray.200' />
      ))}
    </HStack>
  )
}
