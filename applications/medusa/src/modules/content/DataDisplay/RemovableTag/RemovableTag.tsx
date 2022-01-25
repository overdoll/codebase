import { Box, HTMLChakraProps, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import { Icon } from '../../index'
import { FunctionComponent } from 'react'

interface Props extends HTMLChakraProps<any> {
  onRemove: (id) => void
  id: string
  title: string
  icon?: FunctionComponent<any>
}

export default function RemovableTag ({
  id,
  title,
  onRemove,
  icon,
  ...rest
}: Props): JSX.Element {
  return (
    <Tag color='gray.00' borderRadius='full' size='lg' {...rest}>
      {icon != null &&
        <Box
          borderRadius='full'
          mr={1}
          p={1}
          bg='gray.900'
        >
          <Icon icon={icon} w={3} h={3} fill='gray.100' />
        </Box>}
      <TagLabel>{title}</TagLabel>
      <TagCloseButton
        color='gray.00'
        opacity={1}
        bg='orange.400'
        onClick={() => onRemove(id)}
      />
    </Tag>
  )
}
