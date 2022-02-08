import { ReactNode, useTransition } from 'react'
import { Box } from '@chakra-ui/react'
import ClickableTile from '../ClickableTile/ClickableTile'
import { MultiSelectedValue, MultiSelectedValueFunction } from '../../hooks/useMultiSelector'

interface Props {
  id: string
  selected: MultiSelectedValue
  name: string
  type?: string | undefined
  onSelect: MultiSelectedValueFunction
  children: ReactNode
}

export default function SingleSelector ({
  id,
  selected,
  onSelect,
  name,
  type,
  children
}: Props): JSX.Element {
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 10000
  })

  const onClick = (): void => {
    startTransition(() => {
      onSelect(id, name, type)
    })
  }

  const isSelected = Object.keys(selected).includes(id)

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
