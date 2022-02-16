import {
  HTMLChakraProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack
} from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useHistoryDisclosure, useSearchQueryArguments } from '@//:modules/hooks'
import { Suspense, useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import SearchInput from '../../../../components/SearchInput/SearchInput'
import SkeletonStack from '../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary
  from '../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SelectSeriesSearch from './SelectSeriesSearch/SelectSeriesSearch'
import { useSingleSelector } from '@//:modules/content/ContentSelection'
import RemovableTag from '@//:modules/content/DataDisplay/RemovableTag/RemovableTag'

interface Props extends HTMLChakraProps<any> {
  onChange: (id: string) => void
  isInvalid?: boolean | undefined
}

export default function SelectSeriesButton ({
  onChange,
  isInvalid,
  ...rest
}: Props): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ title: null })

  const [currentSelection, setCurrentSelection, clearSelection] = useSingleSelector({})

  const [search, setSearch] = useState<string>('')

  const { i18n } = useLingui()

  const onClear = (): void => {
    clearSelection()
    onChange('')
  }

  const onChangeSelection = (id: string): void => {
    onChange(id)
    setCurrentSelection(id)
    onClose()
  }

  useEffect(() => {
    setQueryArgs({ title: search })
  }, [search])

  const DisplayButton = (): JSX.Element => {
    return (
      <Stack spacing={2}>
        {currentSelection != null && (
          <RemovableTag
            onRemove={onClear}
            id={currentSelection}
            title={currentSelection}
          />)}
        <Button
          colorScheme={isInvalid === true ? 'orange' : 'gray'}
          variant='solid'
          onClick={onOpen}
          {...rest}
        >
          <Trans>
            Select Series
          </Trans>
        </Button>
      </Stack>
    )
  }

  return (
    <>
      <DisplayButton />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='none'
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Select a series
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <Stack spacing={4}>
              <SearchInput
                variant='outline'
                onChange={setSearch}
                placeholder={i18n._(t`Search for a series`)}
              />
              <QueryErrorBoundary loadQuery={() => setQueryArgs({ title: null })}>
                <Suspense fallback={<SkeletonStack />}>
                  <SelectSeriesSearch
                    queryArgs={queryArgs}
                    selected={currentSelection}
                    onSelect={onChangeSelection}
                  />
                </Suspense>
              </QueryErrorBoundary>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
