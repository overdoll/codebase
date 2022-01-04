import { graphql, usePaginationFragment } from 'react-relay'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { ClubSelectorQuery } from '@//:artifacts/ClubSelectorQuery.graphql'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Link } from '@//:modules/routing'

const Query = graphql`
  query ClubSelectorQuery {
    viewer {
      ...ClubSelectorFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubSelectorFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "ClubSelectorPaginationFragment" )
  {
    clubs (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "ClubSelector_clubs")
    {
      edges {
        node {
          id
          name
          slug
          thumbnail {
            ...ResourceItemFragment
          }
        }
      }
    }
  }
`

export default function ClubSelector (): JSX.Element {
  const queryData = useLazyLoadQuery<ClubSelectorQuery>(
    Query,
    {}
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<ClubSelectorQuery, any>(
    Fragment,
    queryData.viewer
  )

  const clubs = data.clubs.edges

  if (clubs.length < 1) {
    return (
      <SmallBackgroundBox>
        <Stack>
          <Alert status='warning'>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                You don't have any clubs. You need to have access to at least one before you can create a post.
              </Trans>
            </AlertDescription>
          </Alert>
          <Link to='/manage/clubs'>
            <Button
              w='100%'
              colorScheme='orange'
              variant='solid'
              size='lg'
            ><Trans>
              Create a Club
            </Trans>
            </Button>
          </Link>
        </Stack>
      </SmallBackgroundBox>
    )
  }

  return (
    <>select club</>
  )
}
