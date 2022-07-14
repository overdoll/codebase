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
import { Trans } from '@lingui/macro'
import Button from '../../../../../../../form/Button/Button'
import CloseButton from '../../../../../../ThemeComponents/CloseButton/CloseButton'
import { Suspense } from 'react'
import SkeletonStack from '../../../../../../Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '../../../../../../Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SelectTopicSearch from './SelectTopicSearch/SelectTopicSearch'
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

export default function SelectTopicButton ({
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
    searchArguments,
    loadQuery
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
            Select Topic
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
              Select a topic
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <QueryErrorBoundary loadQuery={loadQuery}>
              <Suspense fallback={<SkeletonStack />}>
                <SelectTopicSearch
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
