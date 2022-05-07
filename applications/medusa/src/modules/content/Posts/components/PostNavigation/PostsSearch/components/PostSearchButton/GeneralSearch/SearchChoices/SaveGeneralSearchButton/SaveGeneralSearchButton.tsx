import { Button } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { encodeQueryParams } from 'serialize-query-params'
import { stringify } from 'query-string'
import { useQueryParams } from 'use-query-params'
import { useChoiceContext } from '../../../../../../../../../HookedComponents/Choice'
import { filterObjectByKeyValue } from '../../../../../support/filterObjectByKeyValue'
import { configMap } from '../../../../../constants'
import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'

interface Props {
  onClose: (push?: boolean) => void
  routeTo: string | UrlObject
}

export default function SaveGeneralSearchButton ({
  onClose,
  routeTo
}: Props): JSX.Element {
  const router = useRouter()

  const { asPath } = router

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
    const [, resolved] = resolveHref(router, routeTo, true)

    if (asPath !== resolved) {
      const encodedQuery = encodeQueryParams(configMap,
        {
          ...setValues,
          sort: 'TOP'
        })
      void router.push(`${resolved}?${stringify(encodedQuery)}`)
      onClose(false)
      return
    }
    setQuery(setValues)
    onClose()
  }

  if (Object.keys(values).length < 1) {
    return (
      <Button onClick={onClose as any} size='lg' colorScheme='gray'>
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
