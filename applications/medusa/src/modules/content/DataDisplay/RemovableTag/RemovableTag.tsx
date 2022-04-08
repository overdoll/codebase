import { HTMLChakraProps, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'

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
  const { i18n } = useLingui()

  return (
    <Tag color='gray.00' borderRadius='full' size='lg' {...rest}>
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
