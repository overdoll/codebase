import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  RefreshProcessContentQuery,
  RefreshProcessContentQuery$variables
} from '@//:artifacts/RefreshProcessContentQuery.graphql'
import { CheckMark, WarningTriangle } from '@//:assets/icons/interface'
import { Heading, HStack, Spinner } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import { ArrowButtonRight } from '@//:assets/icons'
import { useContext } from 'react'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'

interface Props extends ComponentSearchArguments<RefreshProcessContentQuery$variables> {
}

const Query = graphql`
  query RefreshProcessContentQuery($reference: String!) {
    post (reference: $reference) {
      id
      reference
      content {
        id
        viewerCanViewSupporterOnlyContent
        isSupporterOnly
        resource {
          failed
          processed
          videoDuration
          videoThumbnail {
            url
          }
          urls {
            mimeType
            url
          }
          width
          height
          preview
        }
      }
    }
  }
`

export const isProcessed = (content): boolean => {
  const processed = content.map((item) => item.resource.processed) as boolean[]
  return processed.every(x => x)
}

export const isFailed = (content): boolean => {
  const failed = content.map((item) => item.resource.failed) as boolean[]
  return failed.some(x => x)
}

export default function RefreshProcessContent ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<RefreshProcessContentQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const { skipToStep } = useContext(FlowContext)

  const contentIsProcessed = isProcessed(queryData?.post?.content)
  const contentFailed = isFailed(queryData?.post?.content)

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

    return (
      <Heading {...TEXT_PROPS}>
        <Trans>
          Post Content Processed
        </Trans>
      </Heading>
    )
  }

  return (
    <ClickableTile onClick={() => skipToStep('content')}>
      <LargeBackgroundBox borderRadius='inherit' p={3}>
        <HStack justify='space-between'>
          <HStack spacing={2}>
            <ProcessingIcon />
            <ProcessingText />
          </HStack>
          <Icon icon={ArrowButtonRight} w={4} h={4} fill='gray.300' />
        </HStack>
      </LargeBackgroundBox>
    </ClickableTile>
  )
}
