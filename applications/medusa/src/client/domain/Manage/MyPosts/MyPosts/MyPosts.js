/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import { usePaginationFragment } from 'react-relay';
import type { MyPostsQuery } from '@//:artifacts/MyPostsQuery.graphql';
import type { MyPostsFragment$key } from '@//:artifacts/MyPostsFragment.graphql';
import { ClickableBox } from '@//:modules/content/PageLayout';
import { Text } from '@chakra-ui/react';
import PostStatePreview from './PostStatePreview/PostStatePreview';
import { useTranslation } from 'react-i18next';
import { GridWrap, LargeGridItem } from '../../../../components/ContentSelection';

type Props = {
  query: MyPostsQuery
}
const MyPostsQueryGQL = graphql`
  query MyPostsQuery  {
    viewer {
      ...MyPostsFragment
    }
  }
`

const MyPostsFragmentGQL = graphql`
  fragment MyPostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "OpenDraftPostsPaginationQuery" ) {
    posts (first: $first, after: $after)
    @connection(key: "OpenDraftPostsPaginationQuery_posts") {
      edges {
        node {
          ...PostStatePreviewFragment
        }
      }
    }
  }
`

export default function MyPosts ({ query }: Props): Node {
  const queryData = usePreloadedQuery<MyPostsQuery>(
    MyPostsQueryGQL,
    query
  )

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<MyPostsFragment$key,
    _>(
      MyPostsFragmentGQL,
      queryData.viewer
    )

  const [t] = useTranslation('manage')

  return (
    <GridWrap spacing={0}>
      {data.posts.edges.map((item, index) =>
        <LargeGridItem key={index} h={230}>
          <PostStatePreview query={item.node} />
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
              {t('create_post.flow.drafts.load')}
            </Text>
          </ClickableBox>
        </LargeGridItem>}
    </GridWrap>
  )
}
