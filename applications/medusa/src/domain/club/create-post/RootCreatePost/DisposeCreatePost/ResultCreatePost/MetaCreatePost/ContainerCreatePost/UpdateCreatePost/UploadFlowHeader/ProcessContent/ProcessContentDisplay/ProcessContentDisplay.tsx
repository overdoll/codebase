import { graphql, useFragment } from 'react-relay/hooks'
import type { ProcessContentDisplayFragment$key } from '@//:artifacts/ProcessContentDisplayFragment.graphql'
import { ArrowButtonDown, ArrowButtonUp, CheckMark, InfoCircle, WarningTriangle } from '@//:assets/icons'
import { Collapse, Flex, Heading, HStack, Progress, Spinner, Stack, useDisclosure } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { ClickableTile, GridTile } from '@//:modules/content/ContentSelection'
import { ReactNode, useContext, useMemo } from 'react'
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
      id
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

  const ICON_PROPS = {
    w: 4,
    h: 4
  }

  const MemoSpinner = useMemo(() => <Spinner color='teal.300' {...ICON_PROPS} />, [])

  const ProcessingIcon = (): JSX.Element => {
    if (contentFailed) {
      return (
        <Icon icon={WarningTriangle} fill='orange.300' {...ICON_PROPS} />
      )
    }
    if (!contentIsProcessed) {
      return MemoSpinner
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

  const ProcessingProgress = (): JSX.Element => {
    const progressArray = data.content.map((item) => item.resource.processed ? 100 : (item.resource.progress?.progress ?? 0))

    const progressValue = progressArray.reduce((sum, accum) => sum + accum, 0)

    const percentageValue = (progressValue / progressArray.length)

    if (percentageValue === 100) {
      return <></>
    }

    return (
      <Progress
        size='md'
        h={1}
        colorScheme={contentFailed ? 'orange' : 'teal'}
        w='100%'
        value={percentageValue}
      />
    )
  }

  const InnerDisplay = (): JSX.Element => {
    return (
      <HStack align='center' spacing={2}>
        <ProcessingIcon />
        <ProcessingText />
      </HStack>
    )
  }

  const BackgroundProgress = (children: ReactNode): JSX.Element => {
    return (
      <LargeBackgroundBox overflow='hidden' borderRadius='md' p={0}>
        <Flex p={3}>
          {children}
        </Flex>
        <ProcessingProgress />
      </LargeBackgroundBox>
    )
  }

  if (currentStep === 'content' || currentStep === 'review') {
    if (contentIsProcessed && !contentFailed) {
      return <></>
    }
    return BackgroundProgress((
      <HStack align='center' spacing={2}>
        <ProcessingIcon />
        <ProcessingText />
      </HStack>))
  }

  return (
    <Stack spacing={2}>
      <ClickableTile onClick={onToggle}>
        {BackgroundProgress((
          <HStack w='100%' justify='space-between'>
            <InnerDisplay />
            <Icon icon={isOpen ? ArrowButtonUp : ArrowButtonDown} fill='gray.500' w={4} h={4} />
          </HStack>))}
      </ClickableTile>
      <Collapse in={isOpen}>
        <LargeBackgroundBox borderRadius='md' p={2}>
          <Stack spacing={2}>
            <ShortGridWrap>
              {data.content.map((item) => (
                <GridTile key={item.id}>
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
