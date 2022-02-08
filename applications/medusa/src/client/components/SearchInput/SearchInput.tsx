import { MutableRefObject, useEffect, useState, useTransition } from 'react'
import { HTMLChakraProps, Input, InputGroup, InputRightElement, Spinner } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import CloseButton from '@//:modules/form/CloseButton/CloseButton'

interface Props extends HTMLChakraProps<any> {
  children?: ({ searchInput: string }) => {}
  placeholder?: string
  onChange?: (search) => void
  variant?: string
  sendRef?: MutableRefObject<any>
}

export default function SearchInput ({
  placeholder,
  children,
  onChange,
  variant = 'filled',
  sendRef,
  ...rest
}: Props): JSX.Element {
  const [searchInput, setSearch] = useState('')

  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 7000
  })

  const { i18n } = useLingui()

  const clearSearch = (): void => {
    setSearch('')
  }

  const onChangeInput = (e): void => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    startTransition(() => {
      onChange?.(searchInput)
    })
  }, [searchInput])

  return (
    <>
      <InputGroup>
        <Input
          ref={sendRef}
          size='lg'
          value={searchInput}
          placeholder={placeholder ?? i18n._(t`Enter a search term`)}
          onChange={onChangeInput}
          variant={variant}
          {...rest}
        />
        <InputRightElement mr={1} h='100%'>
          {isPending
            ? (<Spinner size='sm' />)
            : (
              <CloseButton
                size='md'
                hidden={searchInput === ''}
                onClick={clearSearch}
              />)}
        </InputRightElement>
      </InputGroup>
      {children?.({ searchInput })}
    </>
  )
}
