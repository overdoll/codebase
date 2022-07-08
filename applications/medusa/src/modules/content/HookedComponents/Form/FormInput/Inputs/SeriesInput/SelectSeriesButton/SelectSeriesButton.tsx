import {
  HTMLChakraProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Button from '../../../../../../../form/Button/Button'
import CloseButton from '../../../../../../ThemeComponents/CloseButton/CloseButton'
import { Suspense } from 'react'
import { useLingui } from '@lingui/react'
import SearchInput from '../../../../../Search/components/SearchInput/SearchInput'
import SkeletonStack from '../../../../../../Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '../../../../../../Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SelectSeriesSearch from './SelectSeriesSearch/SelectSeriesSearch'
import { useChoice } from '../../../../../Choice'
import ChoiceRemovableTags from '../../../../../Choice/components/ChoiceRemovableTags/ChoiceRemovableTags'
import useSearch from '../../../../../Search/hooks/useSearch'

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
  } = useDisclosure()

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
          titleKey='title'
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
                nullifyOnClear
                {...registerSearch('title', 'change')}
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
