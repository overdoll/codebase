/**
 * @flow
 */
import type { Node } from 'react'
import {
  InputLeftElement,
  Input,
  InputRightElement,
  IconButton, InputGroup,
  CloseButton
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import SearchCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/search/search-circle.svg'
import InterfaceDelete1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-1.svg'
import { useState } from 'react'

type Props = {
  placeholder?: string,
  onChange: () => void
};

export default function SearchInput ({ placeholder, onChange }: Props): Node {
  const [searchInput, setSearch] = useState('')

  const clearSearch = (e) => {
    setSearch('')
  }

  const onChangeInput = (e) => {
    setSearch(e.target.value)
    onChange(e.target.value)
  }

  const [t] = useTranslation('manage')

  return (
    <InputGroup>
      <Input
        size='lg'
        value={searchInput}
        placeholder={placeholder || t('input.search')}
        onChange={onChangeInput}
        variant='filled'
      />
      <InputRightElement mr={2} h='100%'>
        <CloseButton
          color='gray.200'
          hidden={!searchInput}
          onClick={clearSearch}
        />
      </InputRightElement>
    </InputGroup>
  )
}
