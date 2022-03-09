import { ReactNode, useTransition } from 'react'
import { Box } from '@chakra-ui/react'
import { RegisterFunctionReturn } from '../../types'
import { ClickableTile } from '../../../../ContentSelection'

interface ChoiceProps extends RegisterFunctionReturn {
  children: ReactNode
}

export default function Choice ({
  id,
  isActive,
  onChange,
  children
}: ChoiceProps): JSX.Element {
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 1000
  })

  const onClick = (): void => {
    startTransition(() => {
      onChange()
    })
  }

  return (
    <Box
      id={id}
      h='100%'
      w='inherit'
      borderRadius='md'
      borderColor={isActive ? 'green.500' : 'transparent'}
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
