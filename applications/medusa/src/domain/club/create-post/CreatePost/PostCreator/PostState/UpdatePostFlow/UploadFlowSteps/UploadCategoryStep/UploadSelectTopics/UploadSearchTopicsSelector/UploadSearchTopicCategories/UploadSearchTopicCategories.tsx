import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import { CategoryTileOverlay, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import type { UploadSearchTopicsSelectorQuery } from '@//:artifacts/UploadSearchTopicsSelectorQuery.graphql'
import type { UploadSearchTopicCategoriesFragment$key } from '@//:artifacts/UploadSearchTopicCategoriesFragment.graphql'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import ShortGridWrap from '@//:modules/content/ContentSelection/ShortGridWrap/ShortGridWrap'
import ClickableTile from '@//:modules/content/ContentSelection/ClickableTile/ClickableTile'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { ArrowButtonLeft } from '@//:assets/icons'

interface Props extends ComponentChoiceArguments<any> {
  query: UploadSearchTopicCategoriesFragment$key
  clearValues: () => void
}

const Fragment = graphql`
  fragment UploadSearchTopicCategoriesFragment on Topic
  @argumentDefinitions(
    first: {type: Int, defaultValue: 19}
    after: {type: String},
  )
  @refetchable(queryName: "UploadSearchTopicCategoriesFragmentPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
    ) @connection(key: "UploadSearchTopicCategoriesFragment_categories")
    {
      edges {
        node {
          id
          title
          ...CategoryTileOverlayFragment
        }
      }
    }
    title
    description
  }
`

export default function UploadSearchTopicCategories ({
  query,
  register: registerCategory,
  clearValues
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchTopicsSelectorQuery, any>(
    Fragment,
    query
  )

  return (
    <Stack spacing={2}>
      <LargeBackgroundBox p={2}>
        <Heading fontSize='lg' color='gray.100'>
          {data.title}
        </Heading>
        <Text fontSize='sm' color='gray.200'>
          {data.description}
        </Text>
      </LargeBackgroundBox>
      <EmptyBoundary
        fallback={<></>}
        condition={data.categories.edges.length < 1}
      >
        <ShortGridWrap>
          <ShortGridTile>
            <ClickableTile bg='gray.800' onClick={clearValues}>
              <Stack spacing={2}>
                <Icon icon={ArrowButtonLeft} w={3} h={3} color='gray.100' />
                <Heading
                  fontSize={{
                    base: 'sm',
                    md: 'md'
                  }}
                  textAlign='center'
                  color='gray.100'
                >
                  <Trans>
                    Back To Topics
                  </Trans>
                </Heading>
              </Stack>
            </ClickableTile>
          </ShortGridTile>
          {data.categories.edges.map((item, index) => (
            <ShortGridTile key={index}>
              <Choice
                {...registerCategory(item.node.id, {
                  title: item.node.title
                })}
              >
                <CategoryTileOverlay query={item.node} />
              </Choice>
            </ShortGridTile>
          )
          )}
          <LoadMoreGridTile
            hasNext={hasNext}
            onLoadNext={() => loadNext(15)}
            isLoadingNext={isLoadingNext}
          />
        </ShortGridWrap>
      </EmptyBoundary>
    </Stack>

  )
}
