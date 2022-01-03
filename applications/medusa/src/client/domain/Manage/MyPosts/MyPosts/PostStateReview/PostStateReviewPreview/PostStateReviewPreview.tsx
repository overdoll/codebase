import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { graphql } from 'react-relay/hooks'
import type { PostStateReviewPreviewFragment$key } from '@//:artifacts/PostStateReviewPreviewFragment.graphql'
import { useFragment } from 'react-relay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { format } from 'date-fns'
import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'

interface Props {
  query: PostStateReviewPreviewFragment$key
}

const Fragment = graphql`
  fragment PostStateReviewPreviewFragment on Post {
    id
    reference
    postedAt
    content {
      ...ResourceItemFragment
    }
  }
`

export default function PostStateReviewPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const limitedContent = data.content.slice(0, 3)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const formattedDate = format(new Date(data.postedAt as Date), 'eeee h:mm aaa', { locale })

  const DisplayContentGrid = (): JSX.Element => {
    return (
      <SimpleGrid h='100%' spacing={0} columns={data.content.length > 3 ? 4 : limitedContent.length}>
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
              <Heading color='gray.00' fontSize='lg'>
                <Trans>
                  Posted on {formattedDate}
                </Trans>
              </Heading>
            </Flex>
          </Flex>
        </SmallBackgroundBox>
      </Flex>
    </Flex>
  )
}
