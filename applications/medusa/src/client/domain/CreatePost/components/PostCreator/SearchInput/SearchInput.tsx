import { useState } from 'react'
import { CloseButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { t } from '@lingui/macro'

interface Props {
  children: ({ searchInput: string }) => {}
  placeholder?: string
}

export default function SearchInput ({
  placeholder,
  children
}: Props): JSX.Element {
  const [searchInput, setSearch] = useState('')

  const clearSearch = (): void => {
    setSearch('')
  }

  const onChangeInput = (e): void => {
    setSearch(e.target.value)
  }

  return (
    <>
      <InputGroup>
        <Input
          size='lg'
          value={searchInput}
          placeholder={placeholder ?? t`Enter a search term`}
          onChange={onChangeInput}
          variant='filled'
        />
        <InputRightElement mr={2} h='100%'>
          <CloseButton
            color='gray.200'
            hidden={searchInput !== ''}
            onClick={clearSearch}
          />
        </InputRightElement>
      </InputGroup>
      {children({ searchInput })}
    </>
  )
}
