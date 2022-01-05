import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { ClickableBox, ListSpacer, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import Icon from '../../../../../modules/content/Icon/Icon'
import { AddPlus } from '@//:assets/icons/interface'
import { Link } from '@//:modules/routing'
import ClubPreview from '../../../../components/Posts/components/PostFlair/ClubPreview/ClubPreview'
import { Fragment } from 'react'

interface Props {
  query: PreloadedQuery<MyClubsQuery>
}

const Query = graphql`
  query MyClubsQuery {
    viewer {
      ...MyClubsFragment
    }
  }
`

const FragmentGQL = graphql`
  fragment MyClubsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "ManageClubsPaginationFragment" )
  {
    clubs (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "ManageClubs_clubs") {
      edges {
        node {
          ...ClubPreviewFragment
          slug
        }
      }
    }
  }
`
export default function MyClubs ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<MyClubsQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<MyClubsQuery, any>(
    FragmentGQL,
    queryData.viewer
  )

  return (
    <Stack spacing={4}>
      <SmallBackgroundBox w='100%'>
        <Flex align='center' justify='space-between'>
          <Box>
            <Heading color='gray.00' fontSize='2xl'>
              <Trans>
                Your Clubs
              </Trans>
            </Heading>
          </Box>
          <Link to='/configure/create-club'>
            <Button
              leftIcon={
                <Icon
                  icon={AddPlus}
                  w={4}
                  h={4}
                  fill={data.clubs.edges.length < 1 ? 'teal.900' : 'gray.100'}
                />
              }
              size='md'
              colorScheme={data.clubs.edges.length < 1 ? 'teal' : 'gray'}
            >
              <Trans>
                Club
              </Trans>
            </Button>
          </Link>
        </Flex>
      </SmallBackgroundBox>
      {data.clubs.edges.length < 1
        ? <SmallBackgroundBox>
          <Text fontSize='sm'>
            <Trans>
              Clubs allow you to organize your posts and community all in one place. You need to create or have access
              to at least one club to be able to upload posts.
            </Trans>
          </Text>
        </SmallBackgroundBox>
        : <ListSpacer>
          {data.clubs.edges.map((item, index) =>
            <Fragment key={index}>
              <Link to={`/${item.node.slug as string}`}>
                <ClickableBox>
                  <ClubPreview query={item.node} />
                </ClickableBox>
              </Link>
            </Fragment>)}
        </ListSpacer>}
      {hasNext &&
        <Flex justify='center'>
          <ClickableBox
            onClick={() => loadNext(3)}
            isLoading={isLoadingNext}
          >
            <Flex justify='center'>
              <Text>
                <Trans>
                  Load more clubs
                </Trans>
              </Text>
            </Flex>
          </ClickableBox>
        </Flex>}
    </Stack>
  )
}