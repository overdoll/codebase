import { useState } from 'react'
import { Input, InputGroup, InputProps, InputRightElement, Spinner } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import CloseButton from '../../../../ThemeComponents/CloseButton/CloseButton'
import { RegisterFunctionReturn } from '../../types'
import { useDebounce, useUpdateEffect } from 'usehooks-ts'

interface Props extends Omit<InputProps, 'id'>, RegisterFunctionReturn {
  nullifyOnClear?: boolean
}

export default function SearchInput ({
  id,
  onChangeRegister,
  isPending,
  size,
  nullifyOnClear,
  ...rest
}: Props): JSX.Element {
  const [searchInput, setSearch] = useState('')

  const debouncedSearchInput = useDebounce(searchInput, 300)

  const { i18n } = useLingui()

  const showRightElement = isPending || searchInput !== ''

  const SearchInputRightElement = (): JSX.Element => {
    if (!showRightElement) return <></>

    return (
      <InputRightElement mr={2} h='100%'>
        {isPending
          ? (<Spinner color='gray.200' w={6} h={6} size={size ?? 'lg'} />)
          : searchInput !== '' && (
            <CloseButton
              color='gray.200'
              h='80%'
              size={size ?? 'lg'}
              aria-label={i18n._(t`Clear Search`)}
              onClick={clearSearch}
            />)}
      </InputRightElement>
    )
  }

  const clearSearch = (): void => {
    setSearch('')
  }

  const onChangeInput = (value: string): void => {
    setSearch(value)
  }

  useUpdateEffect(() => {
    onChangeRegister(debouncedSearchInput !== '' ? debouncedSearchInput : (nullifyOnClear === true ? null : ''))
  }, [debouncedSearchInput])

  return (
    <>
      <InputGroup>
        <Input
          id={id}
          size={size ?? 'lg'}
          value={searchInput}
          onChange={(e) => onChangeInput(e.target.value)}
          variant='filled'
          {...rest}
        />
        <SearchInputRightElement />
      </InputGroup>
    </>
  )
}
