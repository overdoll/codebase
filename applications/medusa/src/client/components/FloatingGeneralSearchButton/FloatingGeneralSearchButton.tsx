import { Box, Modal, ModalBody, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { t } from '@lingui/macro'
import SearchInput from '../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { useLingui } from '@lingui/react'
import { Dispatch, SetStateAction, Suspense, useRef, useState } from 'react'
import useSearchQueryArguments from '../../../modules/hooks/useSearchQueryArguments'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import GeneralSearch from './components/GeneralSearch/GeneralSearch'
import SaveSearchButton from './components/GeneralSearch/SaveSearchButton/SaveSearchButton'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'
import { ClickableBox, Icon } from '@//:modules/content/PageLayout'
import { SearchBar } from '@//:assets/icons/navigation'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'

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

  const inputRef = useRef(null)

  const [search, setSearch] = useState<string>('')

  const [queryArgs, setQueryArgs] = useSearchQueryArguments({
    search: null,
    first: 2,
    seriesSlugs: series,
    categoriesSlugs: categories,
    charactersSlugs: null,
    charactersSeriesSlug: series != null ? series[0] : null
  })

  const [searchValues, setSearchValues] = useState<SearchValues>({})

  useUpdateEffect(() => {
    setQueryArgs({
      search: search,
      first: 2,
      seriesSlugs: null,
      categoriesSlugs: null,
      charactersSlugs: null,
      charactersSeriesSlug: null
    })
  }, [search])

  useUpdateEffect(() => {
    setQueryArgs({
      search: null,
      first: 2,
      seriesSlugs: series,
      categoriesSlugs: categories,
      charactersSlugs: null,
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
        initialFocusRef={inputRef}
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent bg='transparent' borderRadius='none'>
          <ModalBody overflowX='hidden' p={0}>
            <Suspense fallback={<SkeletonRectangleGrid />}>
              <QueryErrorBoundary loadQuery={() => setQueryArgs({
                search: null,
                first: 2
              })}
              >
                <GeneralSearch
                  searchValues={searchValues}
                  setSearchValues={setSearchValues}
                  queryArguments={queryArgs}
                />
              </QueryErrorBoundary>
            </Suspense>
            <Box p={2} w='100%'>
              <Stack spacing={2}>
                <SearchInput
                  boxShadow='md'
                  size='md'
                  sendRef={inputRef}
                  variant='outline'
                  onChange={setSearch}
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
