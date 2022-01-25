import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'

interface Props {
  id: string
  selected: string[]
  onSelect: (id: string) => void
  children: ReactNode
}

export default function Selector ({
  id,
  selected,
  onSelect,
  children
}: Props): JSX.Element {
  const onClick = (): void => {
    onSelect(id)
  }

  const isSelected = selected.includes(id)

  return (
    <Box
      h='100%'
      borderRadius='md'
      borderColor={isSelected ? 'green.500' : 'transparent'}
      borderWidth={2}
      overflow='hidden'
    >
      <ClickableTile
        onClick={onClick}
      >
        {children}
      </ClickableTile>
    </Box>
  )
}
