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
import { useHistoryDisclosure } from '@//:modules/hooks'
import { Suspense } from 'react'
import { useLingui } from '@lingui/react'
import SearchInput from '../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import SkeletonStack from '../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary
  from '../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SelectSeriesSearch from './SelectSeriesSearch/SelectSeriesSearch'
import { useChoice } from '../../../../../modules/content/HookedComponents/Choice'
import ChoiceRemovableTags from '../../../../../modules/content/HookedComponents/Choice/components/ChoiceRemovableTags/ChoiceRemovableTags'
import useSearch from '../../../../../modules/content/HookedComponents/Search/hooks/useSearch'

interface Props extends HTMLChakraProps<any> {
  onChange: (id: string) => void
  isInvalid?: boolean | undefined
}

interface ChoiceProps {
  tagTitle: string
}

interface SearchProps {
  title: string
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

  const {
    register: registerSearch,
    loadQuery,
    searchArguments
  } = useSearch<SearchProps>({})

  const {
    values,
    removeValue,
    register
  } = useChoice<ChoiceProps>({
    max: 1,
    onChange: (values) => {
      onChange(Object.keys(values)[0] != null ? Object.keys(values)[0] : '')
      onClose()
    }
  })

  const { i18n } = useLingui()

  return (
    <>
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
                {...registerSearch('title')}
                variant='outline'
                placeholder={i18n._(t`Search for a series`)}
              />
              <QueryErrorBoundary loadQuery={loadQuery}>
                <Suspense fallback={<SkeletonStack />}>
                  <SelectSeriesSearch
                    searchArguments={searchArguments}
                    register={register}
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
