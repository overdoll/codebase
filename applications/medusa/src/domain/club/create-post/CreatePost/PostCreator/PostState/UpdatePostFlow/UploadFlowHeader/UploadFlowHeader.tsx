import { useContext, useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  HStack,
  Stack
} from '@chakra-ui/react'
import { useQueryParam } from 'use-query-params'
import type { UploadFlowHeaderFragment$key } from '@//:artifacts/UploadFlowHeaderFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useHistoryDisclosure } from '@//:modules/hooks'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { UppyContext } from '../../../../../context'
import { FlowBuilderHeader, FlowBuilderProgress } from '@//:modules/content/PageLayout'
import ProcessContent from './ProcessContent/ProcessContent'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useLingui } from '@lingui/react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'

interface Props {
  query: UploadFlowHeaderFragment$key
}

const Fragment = graphql`
  fragment UploadFlowHeaderFragment on Post {
    ...ProcessContentFragment
  }
`

export default function UploadFlowHeader ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const uppy = useUppyContext()
  const { reset } = useSequenceContext()

  const cancelButtonRef = useRef(null)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const [, setPostReference] = useQueryParam<string | null | undefined>('post')

  const onCleanup = (): void => {
    uppy.reset()
    reset()
    setPostReference(undefined)
  }

  return (
    <Box>
      <Stack spacing={4}>
        <HStack justify='space-between' spacing={2}>
          <FlowBuilderHeader />
          <CloseButton aria-label={i18n._(t`Exit Creator`)} size='md' onClick={onOpen} />
        </HStack>
        <FlowBuilderProgress />
        <ProcessContent query={data} />
      </Stack>
      <AlertDialog
        preserveScrollBarGap
        isCentered
        leastDestructiveRef={cancelButtonRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Trans>
              Exit Post Creator
            </Trans>
          </AlertDialogHeader>
          <AlertDialogCloseButton
            size='lg'
            as={CloseButton}
          />
          <AlertDialogBody>
            <Trans>
              Are you sure you'd like to exit the post creator? Your progress will save and you can resume it at any
              time.
            </Trans>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant='solid' size='lg' onClick={onClose}>
              <Trans>
                Go back
              </Trans>
            </Button>
            <Button onClick={onCleanup} ml={3} size='lg' colorScheme='orange' variant='solid'>
              <Trans>
                Yes, exit
              </Trans>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  )
}
