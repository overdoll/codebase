import { Box, Modal, ModalBody, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { t } from '@lingui/macro'
import SearchInput from '../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { useLingui } from '@lingui/react'
import { Dispatch, SetStateAction, Suspense, useState } from 'react'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import GeneralSearch from './components/GeneralSearch/GeneralSearch'
import SaveSearchButton from './components/GeneralSearch/SaveSearchButton/SaveSearchButton'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'
import { ClickableBox, Icon } from '@//:modules/content/PageLayout'
import { SearchBar } from '@//:assets/icons/navigation'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

interface Props {
  routeTo: string
}

export interface SearchValues {
  [id: string]: {
    type: 'category' | 'series' | 'character'
    title: string
    slug: string
  }
}

declare type SearchProps = Partial<{
  search: string | null
  first: number
  seriesSlugs: string[] | null
  categoriesSlugs: string[] | null
  charactersSlugs: string[] | null
  charactersSeriesSlug: string | null
}>

export interface StateProps {
  searchValues: SearchValues
  setSearchValues: Dispatch<SetStateAction<SearchValues>>
}

export default function FloatingGeneralSearchButton ({ routeTo }: Props): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const { i18n } = useLingui()

  const [series] = useQueryParam<string[] | null | undefined>('series')
  const [categories] = useQueryParam<string[] | null | undefined>('categories')

  // TODO handle character search somehow

  const {
    searchArguments,
    loadQuery,
    setArguments,
    register
  } = useSearch<SearchProps>({
    defaultValue: {
      search: null,
      first: 3,
      seriesSlugs: series,
      categoriesSlugs: categories,
      charactersSlugs: null,
      charactersSeriesSlug: series != null ? series[0] : null
    }
  })

  const [searchValues, setSearchValues] = useState<SearchValues>({})

  useUpdateEffect(() => {
    setArguments({
      search: searchArguments.variables.search,
      first: 2
    })
  }, [searchArguments.variables.search])

  useUpdateEffect(() => {
    setArguments({
      first: 2,
      seriesSlugs: series,
      categoriesSlugs: categories,
      charactersSeriesSlug: series != null ? series[0] : null
    })
  }, [series, categories])

  return (
    <>
      <Box
        top={{
          base: 2,
          md: 62
        }}
        right={2}
        zIndex='docked'
        position='fixed'
      >
        <ClickableBox
          boxShadow='lg'
          borderRadius='full'
          h={14}
          w={14}
          colorScheme='primary'
          variant='solid'
          onClick={onOpen}
        >
          <Icon fill='gray.00' w={8} h={8} icon={SearchBar} />
        </ClickableBox>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='full'
        motionPreset='none'
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent bg='transparent' borderRadius='none'>
          <ModalBody overflowX='hidden' p={0}>
            <Suspense fallback={<SkeletonRectangleGrid />}>
              <QueryErrorBoundary loadQuery={loadQuery}>
                <GeneralSearch
                  searchValues={searchValues}
                  setSearchValues={setSearchValues}
                  searchArguments={searchArguments}
                />
              </QueryErrorBoundary>
            </Suspense>
            <Box p={2} w='100%'>
              <Stack spacing={2}>
                <SearchInput
                  {...register('search')}
                  boxShadow='md'
                  size='md'
                  variant='outline'
                  placeholder={i18n._(t`Search for characters, categories, or series`)}
                />
                <SaveSearchButton
                  routeTo={routeTo}
                  onClose={onClose}
                  searchValues={searchValues}
                  setSearchValues={setSearchValues}
                />
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
