import { useState } from 'react'
import { Input, InputGroup, InputProps, InputRightElement, Spinner } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import CloseButton from '../../../../ThemeComponents/CloseButton/CloseButton'
import { RegisterFunctionReturn } from '../../types'
import { useDebounce, useUpdateEffect } from 'usehooks-ts'

type Props = InputProps & RegisterFunctionReturn

export default function SearchInput ({
  id,
  onChangeRegister,
  isPending,
  ...rest
}: Props): JSX.Element {
  const [searchInput, setSearch] = useState('')

  const debouncedSearchInput = useDebounce(searchInput, 300)

  const { i18n } = useLingui()

  const clearSearch = (): void => {
    setSearch('')
  }

  const onChangeInput = (value: string): void => {
    setSearch(value)
  }

  useUpdateEffect(() => {
    onChangeRegister(debouncedSearchInput !== '' ? debouncedSearchInput : null)
  }, [debouncedSearchInput])

  return (
    <>
      <InputGroup>
        <Input
          id={id}
          size='lg'
          value={searchInput}
          onChange={(e) => onChangeInput(e.target.value)}
          variant='filled'
          {...rest}
        />
        <InputRightElement mr={1} h='100%'>
          {isPending
            ? (<Spinner size='sm' />)
            : (
              <CloseButton
                size='md'
                aria-label={i18n._(t`Clear Search`)}
                hidden={searchInput === ''}
                onClick={clearSearch}
              />)}
        </InputRightElement>
      </InputGroup>
    </>
  )
}
