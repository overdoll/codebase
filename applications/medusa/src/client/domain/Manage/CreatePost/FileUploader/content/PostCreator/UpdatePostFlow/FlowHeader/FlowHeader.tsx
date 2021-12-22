import { useRef } from 'react'
import type { Dispatch, State } from '@//:types/upload'
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
  Text
} from '@chakra-ui/react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../constants/constants'
import { useQueryParam } from 'use-query-params'
import type { Uppy } from '@uppy/core'
import type { FlowHeaderFragment$key } from '@//:artifacts/FlowHeaderFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import useCheckRequirements from './useCheckRequirements'
import progressScore from './progressScore/index'
import { useHistoryDisclosure } from '@//:modules/hooks'
import Button from '@//:modules/form/Button/Button'
import ExternalLink from '../../../../../../../../components/ContentHints/ExternalLink/ExternalLink'
import { t, Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: FlowHeaderFragment$key
}

const FlowHeaderFragmentGQL = graphql`
  fragment FlowHeaderFragment on Post {
    ...useCheckRequirementsFragment
  }
`

export default function FlowHeader ({
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(FlowHeaderFragmentGQL, query)

  const cancelButtonRef = useRef(null)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const [, setPostReference] = useQueryParam<string | null | undefined>('id')

  const [content, audience, brand, categories, characters] = useCheckRequirements({ query: data })

  const score = progressScore([content, audience, brand, categories, characters])

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
      case STEPS.ARRANGE:
        return [t`Step 1`, t`Arrange your uploads`]
      case STEPS.AUDIENCE:
        return [t`Step 2`, t`Select an audience`]
      case STEPS.BRAND:
        return [t`Step 3`, t`Select a brand`]
      case STEPS.CATEGORY:
        return [t`Step 4`, t`Add categories`]
      case STEPS.CHARACTER:
        return [t`Step 5`, t`Add characters`]
      case STEPS.REVIEW:
        return [t`Step 6`, t`Review your post`]
      default:
        return ['', '']
    }
  }

  return (
    <>
      <Box>
        <Flex align='center' justify='space-between' mb={2}>
          <Flex direction='column'>
            <Heading color='gray.00' fontSize='2xl'>
              {findText()[0]}
            </Heading>
            <Text color='gray.100' fontSize='md'>
              {findText()[1]}
            </Text>
          </Flex>
          <CloseButton size='lg' onClick={onOpen} />
        </Flex>
        <Progress size='sm' colorScheme={score >= 100 ? 'green' : 'primary'} value={score} />
      </Box>
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
              Are you sure you'd like to exit the post creator? You can resume your progress from your
            </Trans>
            <ExternalLink
              mx={2}
              path='/manage/my-posts'
            ><Trans>My Content</Trans>
            </ExternalLink>
            <Trans>
              page at any time.
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
    </>
  )
}
