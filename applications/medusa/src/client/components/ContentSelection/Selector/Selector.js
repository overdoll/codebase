/**
 * @flow
 */
import type { Node } from 'react'
import { ClickableBox } from '@//:modules/content/PageLayout'

type Props = {
  id: string,
  selected: Array<string>,
  onSelect: () => void
}

export default function Selector ({ id, selected, onSelect, children, ...rest }: Props): Node {
  const onClick = () => {
    onSelect(id)
  }

  const isSelected = selected.includes(id)

  return (
    <ClickableBox
      onClick={onClick} borderColor={isSelected ? 'green.500' : 'gray.900'} borderWidth={2} overflow='hidden'
      m={0} p={0}
      borderRadius='semi'
      w='100%' h='100%'
      {...rest}
    >
      {children}
    </ClickableBox>
  )
}
