import { useTransition } from 'react'
import { Box } from '@chakra-ui/react'
import { RegisterFunctionReturn } from '../../types'
import { ClickableTile } from '../../../../ContentSelection'
import runIfFunction from '../../../../../support/runIfFunction'
import { MaybeRenderProp } from '@//:types/components'

interface ChildrenCallable {
  isActive: boolean
}

interface ChoiceProps extends RegisterFunctionReturn {
  children: MaybeRenderProp<ChildrenCallable>
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
    timeoutMs: 300
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
    >
      <ClickableTile
        isDisabled={isDisabled}
        isPending={isPending}
        onClick={onClick}
      >
        {runIfFunction(children, {
          isActive
        })}
      </ClickableTile>
    </Box>
  )
}
