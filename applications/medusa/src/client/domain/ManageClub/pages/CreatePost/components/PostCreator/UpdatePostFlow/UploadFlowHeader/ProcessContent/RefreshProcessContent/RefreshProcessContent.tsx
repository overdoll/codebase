import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { RefreshProcessContentQuery } from '@//:artifacts/RefreshProcessContentQuery.graphql'
import { CheckMark } from '@//:assets/icons/interface'
import { HStack, Spinner, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { QueryArguments } from '@//:types/hooks'
import { useContext } from 'react'
import { Icon } from '@//:modules/content/PageLayout'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  queryArgs: QueryArguments
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
        }
      }
    }
  }
`

export default function RefreshProcessContent ({
  queryArgs
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<RefreshProcessContentQuery>(
    Query,
    queryArgs.variables,
    queryArgs.options
  )

  const dispatch = useContext(DispatchContext)

  const isProcessed = (): boolean => {
    const processed = queryData?.post?.content.map((item) => item.resource.processed) as boolean[]
    return processed.every(x => x)
  }

  const contentIsProcessed = isProcessed()

  useUpdateEffect(() => {
    dispatch({
      type: 'isProcessing',
      value: !contentIsProcessed
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
