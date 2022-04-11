import { Button } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { encodeQueryParams } from 'serialize-query-params'
import { useHistory } from '../../../../../../../../../../routing'
import { stringify } from 'query-string'
import { useQueryParams } from 'use-query-params'
import { useChoiceContext } from '../../../../../../../../../HookedComponents/Choice'
import { filterObjectByKeyValue } from '../../../../../support/filterObjectByKeyValue'
import { configMap } from '../../../../../constants'

interface Props {
  onClose: () => void
  routeTo: string
}

export default function SaveGeneralSearchButton ({
  onClose,
  routeTo
}: Props): JSX.Element {
  const history = useHistory()

  const { values } = useChoiceContext()

  const [, setQuery] = useQueryParams(configMap)

  const getCategories = (): string[] => {
    const categories = filterObjectByKeyValue('type', 'category', values)

    return Object.keys(categories).map((item) => categories[item].slug)
  }

  const getCharacters = (): { [character: string]: string } => {
    const characters = filterObjectByKeyValue('type', 'character', values)

    return Object.keys(characters).reduce((accum, item) => ({
      ...accum,
      [characters[item].slug]: characters[item].series.slug
    }), {})
  }

  const getSeries = (): string[] => {
    const series = filterObjectByKeyValue('type', 'series', values)

    return Object.keys(series).map((item) => series[item].slug)
  }

  const setValues = {
    categories: getCategories().length > 0 ? getCategories() : undefined,
    characters: Object.keys(getCharacters()).length > 0 ? getCharacters() : undefined,
    series: getSeries().length > 0 ? getSeries() : undefined
  }

  const onSaveSearch = (): void => {
    if (history.location.pathname !== routeTo) {
      const encodedQuery = encodeQueryParams(configMap,
        {
          ...setValues,
          sort: 'TOP'
        })
      history.push(`${routeTo}?${stringify(encodedQuery)}`)
      onClose()
      return
    }
    setQuery(setValues)
    onClose()
  }

  if (Object.keys(values).length < 1) {
    return (
      <Button onClick={onClose} size='lg' colorScheme='gray'>
        <Trans>
          Close
        </Trans>
      </Button>
    )
  }

  return (
    <Button
      w='100%'
      onClick={onSaveSearch}
      size='lg'
      colorScheme='primary'
    >
      <Trans>
        Save
      </Trans>
    </Button>
  )
}
