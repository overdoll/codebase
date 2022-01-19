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
  CloseButton,
  Flex,
  Heading,
  Progress,
  Stack,
  Text
} from '@chakra-ui/react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../constants/constants'
import { useQueryParam } from 'use-query-params'
import type { FlowHeaderFragment$key } from '@//:artifacts/FlowHeaderFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import checkPostRequirements from './checkPostRequirements'
import progressScore from './progressScore'
import { useHistoryDisclosure } from '@//:modules/hooks'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DispatchContext, StateContext, UppyContext } from '../../../../context'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: FlowHeaderFragment$key
}

const FlowHeaderFragmentGQL = graphql`
  fragment FlowHeaderFragment on Post {
    ...checkPostRequirementsFragment
  }
`

export default function FlowHeader ({
  query
}: Props): JSX.Element {
  const data = useFragment(FlowHeaderFragmentGQL, query)

  const uppy = useContext(UppyContext)
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const cancelButtonRef = useRef(null)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const [, setPostReference] = useQueryParam<string | null | undefined>('post')

  const postRequirements = checkPostRequirements({ query: data })

  const score = progressScore([postRequirements.hasRequiredAudience, postRequirements.hasRequiredCategories, postRequirements.hasRequiredCharacters, postRequirements.hasRequiredContent])

  const { i18n } = useLingui()

  const onCleanup = (): void => {
    uppy.reset()
    dispatch({
      type: EVENTS.CLEANUP,
      value: INITIAL_STATE
    })
    setPostReference(undefined)
  }

  const findText = (): string[] => {
    switch (state.step) {
      case STEPS.AUDIENCE:
        return [i18n._(t`Step 2`), i18n._(t`Select an audience`)]
      case STEPS.CATEGORY:
        return [i18n._(t`Step 3`), i18n._(t`Add categories`)]
      case STEPS.CHARACTER:
        return [i18n._(t`Step 4`), i18n._(t`Add characters`)]
      case STEPS.PROCESS:
        return [i18n._(t`Step 5`), i18n._(t`Process post`)]
      case STEPS.REVIEW:
        return [i18n._(t`Step 6`), i18n._(t`Wait for processing`)]
      default:
        return [i18n._(t`Step 1`), i18n._(t`Arrange your uploads`)]
    }
  }

  const [header, text] = findText()

  return (
    <Box>
      <Stack spacing={2}>
        <SmallBackgroundBox>
          <Flex align='center' justify='space-between' mb={2}>
            <Flex direction='column'>
              <Heading color='gray.00' fontSize='2xl'>
                {header}
              </Heading>
              <Text color='gray.100' fontSize='md'>
                {text}
              </Text>
            </Flex>
            <CloseButton size='lg' onClick={onOpen} />
          </Flex>
          <Progress size='sm' colorScheme={score >= 100 ? 'green' : 'teal'} value={score} />
        </SmallBackgroundBox>
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
          <AlertDialogCloseButton />
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
