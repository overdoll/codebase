import { HTMLChakraProps, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Random } from '../../../utilities/random'
import hash from '../../../utilities/hash'

interface Props extends HTMLChakraProps<any> {
  onRemove?: (id) => void
  id?: string
  title: string
  generateColor?: boolean
}

const defaultSeed = 'DETERMINISTIC_SEED'

const TAG_COLOR_PALETTE = [
  'purple.300',
  'teal.300',
  'green.300',
  'primary.300',
  'orange.300'
]

export default function RemovableTag ({
  id,
  title,
  onRemove,
  generateColor,
  ...rest
}: Props): JSX.Element {
  const memoized = useMemo(() => new Random(hash(id ?? defaultSeed)), [id])

  const chosenColor = useMemo(() => memoized.nextInt32([0, 5]), [id])

  const bgColor = generateColor === true ? TAG_COLOR_PALETTE[chosenColor] : undefined
  const removeButtonColor = generateColor === true ? 'transparent' : 'orange.300'

  return (
    <Tag color={bgColor} borderRadius='full' size='lg' {...rest}>
      <TagLabel>{title}</TagLabel>
      {(onRemove != null) && id != null && (
        <TagCloseButton
          color='gray.00'
          opacity={1}
          bg={removeButtonColor}
          onClick={() => onRemove(id)}
        />
      )}
    </Tag>
  )
}
