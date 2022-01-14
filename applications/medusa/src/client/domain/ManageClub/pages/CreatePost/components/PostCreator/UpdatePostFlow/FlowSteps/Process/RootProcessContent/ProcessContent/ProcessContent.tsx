import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { ProcessContentQuery } from '@//:artifacts/ProcessContentQuery.graphql'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Icon } from '@//:modules/content'
import { CheckMark } from '@//:assets/icons/interface'
import { HStack, Spinner, Text } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { QueryArgs as QueryArgsType } from '@//:types/upload'

interface Props {
  queryArgs: QueryArgsType
}

const ProcessContentQueryGQL = graphql`
  query ProcessContentQuery($reference: String!) {
    post (reference: $reference) {
      id
      reference
      content {
        id
        processed
      }
    }
  }
`

export default function ProcessContent ({
  queryArgs
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<ProcessContentQuery>(
    ProcessContentQueryGQL,
    queryArgs.variables as { reference: string },
    queryArgs.options
  )

  const isProcessed = (): boolean => {
    const processed = queryData?.post?.content.map((item) => item.processed) as boolean[]
    return processed.every(x => x)
  }

  if (!isProcessed()) {
    return (
      <SmallBackgroundBox>
        <HStack spacing={3}>
          <Spinner color='teal.400' w={4} h={4} />
          <Text color='gray.00' fontSize='md'>
            <Trans>
              Processing Post Content
            </Trans>
          </Text>
        </HStack>
      </SmallBackgroundBox>
    )
  }

  return (
    <SmallBackgroundBox>
      <HStack spacing={3}>
        <Icon icon={CheckMark} fill='green.400' w={4} h={4} />
        <Text color='gray.00' fontSize='md'>
          <Trans>
            Post Content Processed
          </Trans>
        </Text>
      </HStack>
    </SmallBackgroundBox>
  )
}
