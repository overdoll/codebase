import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { SessionsSettingsQuery } from '@//:artifacts/SessionsSettingsQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { Accordion, Flex, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import SessionCard from './SessionCard/SessionCard'
import { SessionsPaginationQuery } from '@//:artifacts/SessionsPaginationQuery.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<SessionsSettingsQuery>
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
    @connection(key: "SessionsSettingsFragment_sessions") {
      __id
      edges {
        node {
          ...SessionCardFragment
        }
      }
    }
  }
`

export default function MultiFactorSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<SessionsSettingsQuery>(
    SessionsSettingsQueryGQL,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<SessionsPaginationQuery, any>(
    SessionsGQL,
    queryData?.viewer
  )

  const sessions = data?.sessions.edges

  const sessionsConnectionID = data?.sessions?.__id

  return (
    <>
      <Accordion allowToggle>
        <Stack mb={3}>
          {sessions.map((item, index) =>
            <SessionCard
              key={index}
              connectionID={sessionsConnectionID}
              query={item.node}
            />
          )}
        </Stack>
      </Accordion>
      {hasNext && (
        <Flex justify='center'>
          <Button
            onClick={() => loadNext(3)}
            isLoading={isLoadingNext}
            color='gray.200'
            variant='link'
          >
            <Trans>
              Load More
            </Trans>
          </Button>
        </Flex>
      )}
    </>
  )
}
