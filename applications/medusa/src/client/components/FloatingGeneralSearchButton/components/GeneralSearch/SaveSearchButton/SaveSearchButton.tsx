import { Button, HStack, Select } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { StateProps } from '../../../FloatingGeneralSearchButton'
import { ArrayParam, encodeQueryParams, StringParam } from 'serialize-query-params'
import { filterObjectByKeyValue } from '../../../helpers/filterObjectByKeyValue'
import { useHistory } from '@//:modules/routing'
import { stringify } from 'query-string'
import { useState } from 'react'
import { useQueryParam } from 'use-query-params'

interface Props extends StateProps {
  onClose: () => void
}

export default function SaveSearchButton ({
  searchValues,
  setSearchValues,
  onClose
}: Props): JSX.Element {
  const history = useHistory()

  const [sortByParam] = useQueryParam<string | null | undefined>('sort')

  const [sortBy, setSortBy] = useState(sortByParam != null ? sortByParam : 'TOP')

  const searchKeys = Object.keys(searchValues)

  const categories = filterObjectByKeyValue('type', 'category', searchValues)
  const characters = filterObjectByKeyValue('type', 'character', searchValues)
  const series = filterObjectByKeyValue('type', 'serial', searchValues)

  const categoriesSlugs = Object.keys(categories).map((item) => categories[item].slug)
  const charactersSlugs = Object.keys(characters).map((item) => characters[item].slug)
  const seriesSlugs = Object.keys(series).map((item) => series[item].slug)

  const onSaveSearch = (): void => {
    const encodedQuery = encodeQueryParams({
      categories: ArrayParam,
      characters: ArrayParam,
      series: ArrayParam,
      sort: StringParam
    }, {
      categories: categoriesSlugs.length > 0 ? categoriesSlugs : undefined,
      characters: charactersSlugs.length > 0 ? charactersSlugs : undefined,
      series: seriesSlugs.length > 0 ? seriesSlugs : undefined,
      sort: sortBy
    })

    history.push(`/search?${stringify(encodedQuery)}`)
    onClose()
  }

  if (searchKeys.length < 1) {
    return (
      <Button onClick={onClose} boxShadow='md' size='lg' colorScheme='gray'>
        <Trans>
          Close
        </Trans>
      </Button>
    )
  }

  return (
    <HStack w='100%' spacing={2}>
      <Button
        w='100%'
        onClick={onSaveSearch}
        boxShadow='md'
        size='lg'
        colorScheme='primary'
      >
        <Trans>
          Save ({searchKeys.length})
        </Trans>
      </Button>
      <Select
        w={32}
        size='lg'
        placeholder=''
        defaultValue={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value='TOP'>
          <Trans>
            Top
          </Trans>
        </option>
        <option value='NEW'>
          <Trans>
            New
          </Trans>
        </option>
      </Select>
    </HStack>
  )
}
