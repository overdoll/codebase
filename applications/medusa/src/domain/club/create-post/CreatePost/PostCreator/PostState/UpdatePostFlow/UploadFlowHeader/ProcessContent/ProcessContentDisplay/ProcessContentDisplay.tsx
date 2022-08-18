import { graphql, useFragment } from 'react-relay/hooks'
import type { ProcessContentDisplayFragment$key } from '@//:artifacts/ProcessContentDisplayFragment.graphql'
import { ArrowButtonDown, ArrowButtonUp, CheckMark, InfoCircle, WarningTriangle } from '@//:assets/icons'
import { Collapse, Flex, Heading, HStack, Spinner, Stack, useDisclosure } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { ClickableTile, GridTile } from '@//:modules/content/ContentSelection'
import { useContext } from 'react'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'
import { isFailed, isProcessed } from '../RefreshProcessContent/RefreshProcessContent'
import ExpandableResourceInfo
  from '../../../UploadFlowSteps/UploadContentStep/UploadContentModify/ContentModifyPreview/PostContentPreview/ExpandableResourceInfo/ExpandableResourceInfo'
import ShortGridWrap from '@//:modules/content/ContentSelection/ShortGridWrap/ShortGridWrap'
import Button from '@//:modules/form/Button/Button'

interface Props {
  query: ProcessContentDisplayFragment$key
}

const Fragment = graphql`
  fragment ProcessContentDisplayFragment on Post {
    id
    content {
      resource {
        failed
        processed
        progress {
          progress
        }
      }
      ...ExpandableResourceInfoFragment
    }
  }
`

export default function ProcessContentDisplay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    skipToStep,
    currentStep
  } = useContext(FlowContext)

  const {
    onToggle,
    isOpen
  } = useDisclosure()

  const contentIsProcessed = isProcessed(data.content)
  const contentFailed = isFailed(data.content)

  const ProcessingIcon = (): JSX.Element => {
    const ICON_PROPS = {
      w: 4,
      h: 4
    }

    if (contentFailed) {
      return (
        <Icon icon={WarningTriangle} fill='orange.300' {...ICON_PROPS} />
      )
    }
    if (!contentIsProcessed) {
      return (
        <Spinner color='teal.300' {...ICON_PROPS} />
      )
    }
    if (currentStep !== 'content') {
      return <Icon icon={InfoCircle} fill='gray.200' {...ICON_PROPS} />
    }

    return <Icon icon={CheckMark} fill='green.300' {...ICON_PROPS} />
  }

  const ProcessingText = (): JSX.Element => {
    const TEXT_PROPS = {
      fontSize: 'md',
      color: 'gray.00',
      lineHeight: 1
    }

    if (contentFailed) {
      return (
        <Heading {...TEXT_PROPS}>
          <Trans>
            Processing Failed
          </Trans>
        </Heading>
      )
    }
    if (!contentIsProcessed) {
      return (
        <Heading {...TEXT_PROPS}>
          <Trans>
            Processing Post Content
          </Trans>
        </Heading>
      )
    }
    if (currentStep !== 'content') {
      return (
        <Heading {...TEXT_PROPS} color='gray.200'>
          <Trans>
            Preview Processed Content
          </Trans>
        </Heading>
      )
    }

    return (
      <Heading {...TEXT_PROPS}>
        <Trans>
          Post Content Processed
        </Trans>
      </Heading>
    )
  }

  if (currentStep === 'content' || currentStep === 'review') {
    if (contentIsProcessed && !contentFailed) {
      return <></>
    }
    return (
      <LargeBackgroundBox borderRadius='md' p={3}>
        <HStack spacing={2}>
          <ProcessingIcon />
          <ProcessingText />
        </HStack>
      </LargeBackgroundBox>
    )
  }

  return (
    <Stack spacing={2}>
      <ClickableTile onClick={onToggle}>
        <LargeBackgroundBox borderRadius='md' p={3}>
          <HStack justify='space-between'>
            <HStack spacing={2}>
              <ProcessingIcon />
              <ProcessingText />
            </HStack>
            <Icon icon={isOpen ? ArrowButtonUp : ArrowButtonDown} fill='gray.500' w={4} h={4} />
          </HStack>
        </LargeBackgroundBox>
      </ClickableTile>
      <Collapse in={isOpen}>
        <LargeBackgroundBox borderRadius='md' p={2}>
          <Stack spacing={2}>
            <ShortGridWrap>
              {data.content.map((item, index) => (
                <GridTile key={index}>
                  <ExpandableResourceInfo query={item} />
                </GridTile>
              ))}
            </ShortGridWrap>
            <Flex w='100%' justify='flex-end'>
              <Button onClick={() => skipToStep('content')} size='sm' variant='ghost'>
                <Trans>
                  Go to Content step
                </Trans>
              </Button>
            </Flex>
          </Stack>
        </LargeBackgroundBox>
      </Collapse>
    </Stack>
  )
}
