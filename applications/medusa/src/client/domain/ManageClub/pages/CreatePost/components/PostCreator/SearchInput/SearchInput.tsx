import { MutableRefObject, useEffect, useState } from 'react'
import { CloseButton, HTMLChakraProps, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { t } from '@lingui/macro'

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

  const clearSearch = (): void => {
    setSearch('')
  }

  const onChangeInput = (e): void => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    onChange?.(searchInput)
  }, [searchInput])

  return (
    <>
      <InputGroup>
        <Input
          ref={sendRef}
          size='lg'
          value={searchInput}
          placeholder={placeholder ?? t`Enter a search term`}
          onChange={onChangeInput}
          variant={variant}
          {...rest}
        />
        <InputRightElement mr={2} h='100%'>
          <CloseButton
            my={1}
            color='gray.200'
            hidden={searchInput === ''}
            onClick={clearSearch}
          />
        </InputRightElement>
      </InputGroup>
      {children?.({ searchInput })}
    </>
  )
}
