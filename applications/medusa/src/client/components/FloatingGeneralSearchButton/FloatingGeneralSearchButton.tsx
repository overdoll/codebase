import { Box, Button, Modal, ModalBody, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { t, Trans } from '@lingui/macro'
import SearchInput from '../../domain/ManageClub/pages/CreatePost/components/PostCreator/SearchInput/SearchInput'
import { useLingui } from '@lingui/react'
import { Dispatch, SetStateAction, Suspense, useEffect, useRef, useState } from 'react'
import useSearchQueryArguments from '../useSearchQueryArguments'
import SkeletonRectangleGrid from '@//:modules/content/Skeleton/SkeletonRectangleGrid/SkeletonRectangleGrid'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import ErrorFallback from '@//:modules/content/Skeleton/Fallback/ErrorFallback/ErrorFallback'
import GeneralSearch from './components/GeneralSearch/GeneralSearch'
import SaveSearchButton from './components/GeneralSearch/SaveSearchButton/SaveSearchButton'

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

export default function FloatingGeneralSearchButton (): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const { i18n } = useLingui()

  const inputRef = useRef(null)

  const [search, setSearch] = useState<string>('')

  const [queryArgs, setQueryArgs] = useSearchQueryArguments({
    search: null,
    first: 3
  })

  const [searchValues, setSearchValues] = useState<SearchValues>({})

  useEffect(() => {
    setQueryArgs({
      search: search,
      first: 3
    })
  }, [search])

  return (
    <>
      <Button onClick={onOpen}>
        <Trans>
          open search
        </Trans>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='full'
        motionPreset='slideInBottom'
        initialFocusRef={inputRef}
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent bg='transparent' borderRadius='none'>
          <ModalBody overflowX='hidden' p={0}>
            <Suspense fallback={<SkeletonRectangleGrid />}>
              <ErrorBoundary
                fallback={({
                  error,
                  reset
                }) => (
                  <ErrorFallback
                    error={error}
                    reset={reset}
                    refetch={() => setQueryArgs({
                      search: null,
                      first: 3
                    })}
                  />
                )}
              >
                <GeneralSearch
                  searchValues={searchValues}
                  setSearchValues={setSearchValues}
                  queryArguments={queryArgs}
                />
              </ErrorBoundary>
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
                <SaveSearchButton onClose={onClose} searchValues={searchValues} setSearchValues={setSearchValues} />
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
