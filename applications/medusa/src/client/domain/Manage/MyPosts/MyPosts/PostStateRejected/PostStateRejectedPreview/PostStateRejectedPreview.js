/**
 * @flow
 */
import type { Node } from 'react'
import { CircularProgress, CircularProgressLabel, Flex, Heading, SimpleGrid, Progress, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ClickableBox, SmallBackgroundBox, SmallMenuButton, SmallMenuItem } from '@//:modules/content/PageLayout'
import { graphql } from 'react-relay/hooks'
import type { PostStateRejectedPreviewFragment$key } from '@//:artifacts/PostStateRejectedPreviewFragment.graphql'
import { useFragment } from 'react-relay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { format } from 'date-fns'

type Props = {
  query: PostStateRejectedPreviewFragment$key,
};

const Fragment = graphql`
  fragment PostStateRejectedPreviewFragment on Post {
    id
    reference
    postedAt
    content {
      type
      urls {
        url
        mimeType
      }
    }
  }
`

export default function PostStateRejectedPreview ({ query }: Props): Node {
  const data = useFragment(Fragment, query)

  const [t] = useTranslation('manage')

  const limitedContent = data.content.slice(0, 3)

  const DisplayContentGrid = () => {
    return (
      <SimpleGrid
        h='100%' spacing={0}
        columns={data.content.length > 3 ? 4 : limitedContent.length}
      >
        {limitedContent.map((item, index) =>
          <ResourceItem h='100%' key={index} type={item.type} urls={item.urls} />
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
              <Heading color='orange.400' fontSize='lg'>
                {t('my_posts.rejected.rejected')}
              </Heading>
            </Flex>
          </Flex>
        </SmallBackgroundBox>
      </Flex>
    </Flex>
  )
}
