import { HStack } from '@chakra-ui/react'
import { FileMp4, FilePng } from '@//:assets/logos'
import { Icon } from '../../../PageLayout'

interface Props {
  fileTypes: string[]
}

const FILE_ICONS = {
  'image/png': FilePng,
  'video/mp4': FileMp4
}

export default function AllowedFileTypesDisplay ({
  fileTypes
}: Props): JSX.Element {
  return (
    <HStack spacing={3}>
      {fileTypes.map((item, index) => (
        <Icon key={index} icon={FILE_ICONS[item]} w={6} h={6} fill='gray.200' />
      ))}
    </HStack>
  )
}
