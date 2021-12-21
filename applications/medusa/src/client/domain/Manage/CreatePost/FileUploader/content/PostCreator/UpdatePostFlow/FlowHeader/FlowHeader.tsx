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
import { useTranslation } from 'react-i18next'
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

  const [t] = useTranslation('manage')

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const [, setPostReference] = useQueryParam<string>('id')

  const [content, audience, brand, categories, characters] = useCheckRequirements({ query: data })

  const score = progressScore([content, audience, brand, categories, characters])

  const onCleanup = (): void => {
    uppy.reset()
    dispatch({
      type: EVENTS.CLEANUP,
      value: INITIAL_STATE
    })
    // @ts-expect-error
    setPostReference(undefined)
  }

  const findText = (): string[] => {
    switch (state.step) {
      case STEPS.ARRANGE:
        return [t('create_post.flow.steps.arrange.header'), t('create_post.flow.steps.arrange.subheader')]
      case STEPS.AUDIENCE:
        return [t('create_post.flow.steps.audience.header'), t('create_post.flow.steps.audience.subheader')]
      case STEPS.BRAND:
        return [t('create_post.flow.steps.brand.header'), t('create_post.flow.steps.brand.subheader')]
      case STEPS.CATEGORY:
        return [t('create_post.flow.steps.category.header'), t('create_post.flow.steps.category.subheader')]
      case STEPS.CHARACTER:
        return [t('create_post.flow.steps.character.header'), t('create_post.flow.steps.character.subheader')]
      case STEPS.REVIEW:
        return [t('create_post.flow.steps.review.header'), t('create_post.flow.steps.review.subheader')]
      case STEPS.SUBMIT:
        return [t('create_post.flow.steps.submit.header'), t('create_post.flow.steps.submit.subheader')]
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
            {t('create_post.flow.steps.header.modal.header')}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {t('create_post.flow.steps.header.modal.body.start')}
            <ExternalLink
              path='/manage/my-posts'
            >{t('create_post.flow.steps.header.modal.body.middle')}
            </ExternalLink>
            {t('create_post.flow.steps.header.modal.body.end')}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant='solid' size='lg' forwardRef={cancelButtonRef} onClick={onClose}>
              {t('create_post.flow.steps.header.modal.cancel')}
            </Button>
            <Button onClick={onCleanup} ml={3} size='lg' colorScheme='orange' variant='solid'>
              {t('create_post.flow.steps.header.modal.confirm')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
