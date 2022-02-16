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
import SearchInput from '../Search/components/SearchInput/SearchInput'
import SkeletonStack from '../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary
  from '../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SelectSeriesSearch from './SelectSeriesSearch/SelectSeriesSearch'
import { ChoiceProvider, useChoice } from '../Choice'
import ChoiceRemovableTags from '../Choice/components/ChoiceRemovableTags/ChoiceRemovableTags'
import { useUpdateEffect } from 'usehooks-ts'

interface Props extends HTMLChakraProps<any> {
  onChange: (id: string) => void
  isInvalid?: boolean | undefined
}

interface ChoiceProps {
  tagTitle: string
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

  const methods = useChoice<ChoiceProps>({ max: 1 })

  const {
    value,
    values,
    removeValue
  } = methods

  const [search, setSearch] = useState<string>('')

  const { i18n } = useLingui()

  useEffect(() => {
    setQueryArgs({ title: search })
  }, [search])

  useUpdateEffect(() => {
    onChange(value != null ? value.id : '')
    onClose()
  }, [value])

  return (
    <ChoiceProvider {...methods}>
      <Stack spacing={2}>
        <ChoiceRemovableTags
          values={values}
          removeValue={removeValue}
        />
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
                  />
                </Suspense>
              </QueryErrorBoundary>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChoiceProvider>
  )
}
