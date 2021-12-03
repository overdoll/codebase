/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, useQueryLoader } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { OpenDraftPostsFragment$key } from '@//:artifacts/OpenDraftPostsFragment.graphql'
import { StringParam, useQueryParam } from 'use-query-params'
import { ListSpacer, SmallBackgroundBox, ClickableBox } from '@//:modules/content/PageLayout'
import { Flex, Text } from '@chakra-ui/react'
import DraftPostPreview from './DraftPostPreview/DraftPostPreview'
import { useTranslation } from 'react-i18next'
import { LargeGridItem, GridWrap } from '../../../../../components/ContentSelection'

type Props = {
  query: OpenDraftPostsFragment$key
}

const OpenDraftPostsGQL = graphql`
  fragment OpenDraftPostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "OpenDraftPostsPaginationQuery" ) {
    posts (first: $first, after: $after)
    @connection(key: "OpenDraftPostsPaginationQuery_posts") {
      edges {
        node {
          ...DraftPostPreviewFragment
        }
      }
    }
  }
`

export default function OpenDraftPosts ({ query }: Props): Node {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<OpenDraftPostsFragment$key,
    _>(
      OpenDraftPostsGQL,
      query
    )

  const [t] = useTranslation('manage')

  return (
    <GridWrap spacing={0}>
      {data.posts.edges.map((item, index) =>
        <LargeGridItem key={index} h={230}>
          <DraftPostPreview query={item.node} />
        </LargeGridItem>
      )}
      {hasNext &&
        <LargeGridItem>
          <ClickableBox
            isLoading={isLoadingNext}
            onClick={() => loadNext(3)}
            h={230}
          >
            <Text textAlign='center' color='gray.00'>
              {t('posts.flow.drafts.load')}
            </Text>
          </ClickableBox>
        </LargeGridItem>}
    </GridWrap>
  )
}
