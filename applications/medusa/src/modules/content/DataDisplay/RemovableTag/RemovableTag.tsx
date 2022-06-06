import { HTMLChakraProps, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'

interface Props extends HTMLChakraProps<any> {
  onRemove: (id) => void
  id: string
  title: string
}

export default function RemovableTag ({
  id,
  title,
  onRemove,
  ...rest
}: Props): JSX.Element {
  return (
    <Tag color='gray.00' borderRadius='full' size='lg' {...rest}>
      <TagLabel>{title}</TagLabel>
      <TagCloseButton
        color='gray.00'
        opacity={1}
        bg='orange.300'
        onClick={() => onRemove(id)}

      />
    </Tag>
  )
}
