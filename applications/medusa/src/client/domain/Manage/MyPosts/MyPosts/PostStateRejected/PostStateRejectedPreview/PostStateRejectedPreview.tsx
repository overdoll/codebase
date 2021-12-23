/**
 * @flow
 */
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { graphql } from 'react-relay/hooks'
import type { PostStateRejectedPreviewFragment$key } from '@//:artifacts/PostStateRejectedPreviewFragment.graphql'
import { useFragment } from 'react-relay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { Trans } from '@lingui/macro'
import { format } from 'date-fns'

interface Props {
  query: PostStateRejectedPreviewFragment$key
}

const Fragment = graphql`
  fragment PostStateRejectedPreviewFragment on Post {
    postedAt
    content {
      ...ResourceItemFragment
    }
  }
`

export default function PostStateRejectedPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const limitedContent = data.content.slice(0, 3)

  const formattedDate = format(new Date(data?.postedAt as Date), 'eeee h:mm aaa')

  const DisplayContentGrid = (): JSX.Element => {
    return (
      <SimpleGrid
        h='100%'
        spacing={0}
        columns={data.content.length > 3 ? 4 : limitedContent.length}
      >
        {limitedContent.map((item, index) =>
          <ResourceItem h='100%' key={index} query={item} />
        )}
        {data.content.length > 3 && (
          <Flex align='center' justify='center'>
            <Heading color='gray.200' fontSize='lg'>
              +{data.content.length - limitedContent.length}
            </Heading>
          </Flex>)}
      </SimpleGrid>
    )
  }

  return (
    <Flex w='100%' h='100%' direction='column'>
      <Flex h='100%' direction='column'>
        <SmallBackgroundBox
          p={0}
          overflow='hidden'
          position='relative'
          h='100%'
        >
          <Flex h='100%' position='relative' direction='column' justify='space-between'>
            <DisplayContentGrid />
            <Flex bg='dimmers.400' h='100%' w='100%' justify='center' align='center' position='absolute'>
              <Heading textAlign='center' color='orange.400' fontSize='lg'>
                <Trans>
                  Rejected (Posted on {formattedDate})
                </Trans>
              </Heading>
            </Flex>
          </Flex>
        </SmallBackgroundBox>
      </Flex>
    </Flex>
  )
}
