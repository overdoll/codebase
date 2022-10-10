import { graphql, useFragment } from 'react-relay/hooks'
import { PostsFiltersFragment$key } from '@//:artifacts/PostsFiltersFragment.graphql'
import { HStack } from '@chakra-ui/react'
import PostsSupporterFilters from '../PostsSupporterFilters/PostsSupporterFilters'
import QuickPreferences from '../QuickPreferences/QuickPreferences'

interface Props {
  loadQuery: (variables: Record<string, any>) => void
  accountQuery: PostsFiltersFragment$key | null
}

const Fragment = graphql`
  fragment PostsFiltersFragment on Account {
    ...PostsSupporterFiltersFragment
    ...QuickPreferencesFragment
  }
`

export default function PostsFilters (props: Props): JSX.Element {
  const {
    loadQuery,
    accountQuery
  } = props

  const data = useFragment(Fragment, accountQuery)

  return (
    <HStack p={1} overflowY='visible' overflowX='auto' spacing={1} justify='space-between'>
      <PostsSupporterFilters loadQuery={loadQuery} query={data} />
      <QuickPreferences query={data} />
    </HStack>
  )
}
