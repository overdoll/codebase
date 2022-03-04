import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  RefreshProcessContentQuery,
  RefreshProcessContentQuery$variables
} from '@//:artifacts/RefreshProcessContentQuery.graphql'
import { CheckMark } from '@//:assets/icons/interface'
import { HStack, Spinner, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { useUpdateEffect } from 'usehooks-ts'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props extends ComponentSearchArguments<RefreshProcessContentQuery$variables> {
}

const Query = graphql`
  query RefreshProcessContentQuery($reference: String!) {
    post (reference: $reference) {
      id
      reference
      content {
        id
        resource {
          processed
          videoDuration
          videoThumbnail {
            url
          }
          urls {
            mimeType
            url
          }
        }
      }
    }
  }
`

export const isProcessed = (content): boolean => {
  const processed = content.map((item) => item.resource.processed) as boolean[]
  return processed.every(x => x)
}

export default function RefreshProcessContent ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<RefreshProcessContentQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const { dispatch } = useSequenceContext()

  const contentIsProcessed = isProcessed(queryData?.post?.content)

  useUpdateEffect(() => {
    dispatch({
      type: 'isProcessing',
      value: !contentIsProcessed,
      transform: 'SET'
    })
  }, [contentIsProcessed])

  if (!contentIsProcessed) {
    return (
      <HStack spacing={3}>
        <Spinner color='teal.400' w={4} h={4} />
        <Text color='gray.00' fontSize='md'>
          <Trans>
            Processing Post Content
          </Trans>
        </Text>
      </HStack>
    )
  }

  return (
    <HStack spacing={3}>
      <Icon icon={CheckMark} fill='green.400' w={4} h={4} />
      <Text color='gray.00' fontSize='md'>
        <Trans>
          Post Content Processed
        </Trans>
      </Text>
    </HStack>
  )
}
