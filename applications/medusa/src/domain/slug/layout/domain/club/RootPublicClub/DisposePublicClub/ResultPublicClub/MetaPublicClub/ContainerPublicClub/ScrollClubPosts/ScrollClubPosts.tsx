import { graphql } from 'react-relay'
import { ScrollClubPostsFragment$key } from '@//:artifacts/ScrollClubPostsFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'
import SwapClubPosts from './SwapClubPosts/SwapClubPosts'
import { useFragment } from 'react-relay/hooks'

interface Props {
  clubQuery: ScrollClubPostsFragment$key
}

const Fragment = graphql`
  fragment ScrollClubPostsFragment on Club {
    slug
    ...ClubEmptyPostsFragment
    ...SwapClubPostsFragment
  }
`

export default function ScrollClubPosts (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const data = useFragment(Fragment, clubQuery)

  return (
    <Stack spacing={4}>
      <SwapClubPosts clubQuery={data} />
      <Flex justify='center'>
        <LinkButton
          width='300px'
          linkProps={{
            scroll: false
          }}
          size='lg'
          colorScheme='gray'
          href={{
            pathname: '/[slug]/posts',
            query: {
              slug: data.slug
            }
          }}
        >
          <Trans>
            See all posts
          </Trans>
        </LinkButton>
      </Flex>
    </Stack>
  )
}
