import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'
import { SingleSelectedValue, SingleSelectedValueFunction } from '../../hooks/useSingleSelector'

interface Props {
  id: string
  selected: SingleSelectedValue[]
  onSelect: SingleSelectedValueFunction
  children: ReactNode
}

export default function SingleSelector ({
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
