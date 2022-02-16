import { ReactNode, useTransition } from 'react'
import { Box } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'
import { SingleSelectedValue, SingleSelectedValueFunction } from '../../hooks/useSingleSelector'

export interface SingleSelectorProps {
  selected: SingleSelectedValue
  onSelect: SingleSelectedValueFunction
}

interface Props extends SingleSelectorProps {
  id: string
  children: ReactNode
}

export default function SingleSelector ({
  id,
  selected,
  onSelect,
  children
}: Props): JSX.Element {
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 1000
  })

  const onClick = (): void => {
    startTransition(() => {
      onSelect(id)
    })
  }

  const isSelected = selected === id

  return (
    <Box
      h='100%'
      borderRadius='md'
      borderColor={isSelected ? 'green.500' : 'transparent'}
      borderWidth={2}
      overflow='hidden'
    >
      <ClickableTile
        isPending={isPending}
        onClick={onClick}
      >
        {children}
      </ClickableTile>
    </Box>
  )
}
