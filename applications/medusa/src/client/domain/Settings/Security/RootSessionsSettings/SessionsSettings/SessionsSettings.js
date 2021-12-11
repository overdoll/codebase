/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import type { SessionsSettingsQuery } from '@//:artifacts/SessionsSettingsQuery.graphql';
import { usePaginationFragment } from 'react-relay';
import type { SessionsSettingsFragment$key } from '@//:artifacts/SessionsSettingsFragment.graphql';
import { Flex, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Button from '@//:modules/form/Button';
import SessionCard from './SessionCard/SessionCard';

type Props = {
  query: PreloadedQueryInner<SessionsSettingsQuery>,
}

const SessionsSettingsQueryGQL = graphql`
  query SessionsSettingsQuery {
    viewer {
      ...SessionsSettingsFragment
    }
  }
`

const SessionsGQL = graphql`
  fragment SessionsSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "SessionsPaginationQuery" ) {
    sessions (first: $first, after: $after)
    @connection(key: "sessions_sessions") {
      __id
      edges {
        node {
          ...SessionCardFragment
        }
      }
    }
  }
`

export default function MultiFactorSettings (props: Props): Node {
  const queryData = usePreloadedQuery<SessionsSettingsQuery>(
    SessionsSettingsQueryGQL,
    props.query
  )

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<SessionsSettingsFragment$key,
    _>(
      SessionsGQL,
      queryData?.viewer
    )

  const [t] = useTranslation('settings')

  const sessions = data?.sessions.edges

  const sessionsConnectionID = data?.sessions?.__id

  return (
    <>
      <Stack mb={3}>
        {sessions.map((item, index) =>
          <SessionCard key={index} connectionID={sessionsConnectionID} query={item.node} />
        )}
      </Stack>
      {hasNext &&
        <Flex justify='center'>
          <Button
            onClick={() => loadNext(3)} isLoading={isLoadingNext} color='gray.200'
            variant='link'
          >{t('security.sessions.load')}
          </Button>
        </Flex>}
    </>
  )
}
