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
import { Trans } from '@lingui/macro'
import Button from '../../../../../../../form/Button/Button'
import CloseButton from '../../../../../../ThemeComponents/CloseButton/CloseButton'
import { useHistoryDisclosure } from '../../../../../../../hooks'
import { Suspense } from 'react'
import SkeletonStack from '../../../../../../Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary
  from '../../../../../../Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useChoice } from '../../../../../Choice'
import ChoiceRemovableTags
  from '../../../../../Choice/components/ChoiceRemovableTags/ChoiceRemovableTags'
import useSearch from '../../../../../Search/hooks/useSearch'
import SelectRuleList from './SelectRuleList/SelectRuleList'

interface Props extends HTMLChakraProps<any> {
  onChange: (id: string) => void
  isInvalid?: boolean | undefined
}

interface ChoiceProps {
  title: string
}

export default function SelectRuleButton ({
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
    loadQuery,
    searchArguments
  } = useSearch<{}>({})

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
            Select Rule
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
              Select a rule
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <QueryErrorBoundary loadQuery={loadQuery}>
              <Suspense fallback={<SkeletonStack />}>
                <SelectRuleList
                  searchArguments={searchArguments}
                  register={register}
                />
              </Suspense>
            </QueryErrorBoundary>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
