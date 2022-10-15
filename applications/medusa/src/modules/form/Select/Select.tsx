import { Select as ChakraSelect, SelectProps, Spinner } from '@chakra-ui/react'
import { ReactNode, useTransition } from 'react'
import { Icon } from '../../content/PageLayout'
import { ArrowButtonDown } from '@//:assets/icons'

interface Props extends SelectProps {
  children: ReactNode
  onChange?: (e) => void
}

export default function Select ({
  children,
  onChange,
  ...rest
}: Props): JSX.Element {
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 300
  })

  const onStartChange = (e): void => {
    onChange != null && startTransition(() => {
      onChange(e)
    })
  }

  return (
    <ChakraSelect
      {...rest}
      icon={isPending
        ? <Spinner />
        : <Icon icon={ArrowButtonDown} fill='gray.200' p={1} />}
      onChange={onStartChange}
      isDisabled={isPending}
    >
      {children}
    </ChakraSelect>
  )
}
