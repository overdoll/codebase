import { HStack } from '@chakra-ui/react'
import { Icon } from '../../../../PageLayout'
import { UppyType } from '../../types'
import { FILE_ICONS } from '../../constants/upload'

interface Props {
  uppy: UppyType
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
