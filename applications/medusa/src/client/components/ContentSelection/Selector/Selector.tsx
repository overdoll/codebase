import { ClickableBox } from '@//:modules/content/PageLayout'
import { ReactNode } from 'react'

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
  children,
  ...rest
}: Props): JSX.Element {
  const onClick = (): void => {
    onSelect(id)
  }

  const isSelected = selected.includes(id)

  return (
    <ClickableBox
      onClick={onClick}
      borderColor={isSelected ? 'green.500' : 'gray.900'}
      borderWidth={2}
      overflow='hidden'
      m={0}
      p={0}
      borderRadius='semi'
      w='100%'
      h='100%'
      {...rest}
    >
      {children}
    </ClickableBox>
  )
}
