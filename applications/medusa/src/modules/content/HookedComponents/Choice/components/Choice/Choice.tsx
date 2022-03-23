import { ReactNode, useTransition } from 'react'
import { Box } from '@chakra-ui/react'
import { RegisterFunctionReturn } from '../../types'
import { ClickableTile } from '../../../../ContentSelection'

interface ChoiceProps extends RegisterFunctionReturn {
  children: ReactNode
  isDisabled?: boolean | undefined
}

export default function Choice ({
  id,
  isActive,
  onChange,
  isDisabled,
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
      h='inherit'
      w='inherit'
      borderRadius='md'
      borderColor={isActive ? 'green.500' : 'transparent'}
      borderWidth={2}
      overflow='hidden'
    >
      <ClickableTile
        isDisabled={isDisabled}
        isPending={isPending}
        onClick={onClick}
      >
        {children}
      </ClickableTile>
    </Box>
  )
}
