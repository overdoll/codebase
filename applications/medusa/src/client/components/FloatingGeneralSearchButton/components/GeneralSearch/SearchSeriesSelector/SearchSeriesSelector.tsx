import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import { Flex, Stack, Text } from '@chakra-ui/react'
import type { GeneralSearchQuery } from '@//:artifacts/GeneralSearchQuery.graphql'
import { SeriesIdentifier } from '@//:assets/icons/interface'
import { GridWrap, RectangleGridItem, Selector } from '../../../../ContentSelection'
import ItemOverlay from '../../../../ContentSelection/components/ItemOverlay/ItemOverlay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { removeNode } from '@//:modules/support'
import type { SearchSeriesSelectorFragment$key } from '@//:artifacts/SearchSeriesSelectorFragment.graphql'
import { Trans } from '@lingui/macro'
import LoadMoreRectangle from '../../../../ContentSelection/components/LoadMoreRectangle/LoadMoreRectangle'
import { Icon } from '@//:modules/content'
import { useEffect } from 'react'

interface Props {
  selected: string[]
  onSelect: (category: any) => void
  query: SearchSeriesSelectorFragment$key
  showEmptyPlaceholder?: boolean
  onDataChange?: (data) => void
}

const Fragment = graphql`
  fragment SearchSeriesSelectorFragment on Query
  @argumentDefinitions(
    after: {type: String},
    title: {type: String}
  )
  @refetchable(queryName: "SearchSeriesSelectorPaginationFragment" )
  {
    series (
      first: $first,
      after: $after,
      title: $search
    ) @connection(key: "SearchSeriesSelector_series")
    {
      edges {
        node {
          id
          title
          slug
          thumbnail {
            ...ResourceItemFragment
          }
        }
      }
    }
  }
`

export default function SearchSeriesSelector ({
  onSelect,
  selected,
  query,
  showEmptyPlaceholder = true,
  onDataChange
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<GeneralSearchQuery, any>(
    Fragment,
    query
  )
  const series = removeNode(data.series.edges)

  const onChangeSelection = (id): void => {
    const serial = series.filter((item) => item.id === id)[0]
    onSelect(serial)
  }

  useEffect(() => {
    onDataChange?.(data)
  }, [data])

  if (series.length < 1 && !showEmptyPlaceholder) {
    return <></>
  }

  // If no categories were found, show empty placeholder
  if (series.length < 1 && showEmptyPlaceholder) {
    return (
      <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
        <Text color='gray.200' textAlign='center' fontSize='lg'>
          <Trans>
            No series were found
          </Trans>
        </Text>
      </Flex>
    )
  }

  return (
    <>
      <GridWrap justify='center'>
        {series.map((item, index) => (
          <RectangleGridItem key={index}>
            <Selector
              onSelect={onChangeSelection}
              selected={selected}
              id={item.id}
            >
              <ItemOverlay background={<ResourceItem
                query={item.thumbnail}
                                       />}
              >
                <Stack spacing={1}>
                  <Icon w={4} h={4} icon={SeriesIdentifier} fill='gray.00' />
                  <Text
                    fontSize='lg'
                    color='gray.00'
                    textAlign='center'
                  >
                    {item.title}
                  </Text>
                </Stack>
              </ItemOverlay>
            </Selector>
          </RectangleGridItem>
        )
        )}
        <LoadMoreRectangle
          text={<Trans>Load More Series</Trans>}
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </>
  )
}
