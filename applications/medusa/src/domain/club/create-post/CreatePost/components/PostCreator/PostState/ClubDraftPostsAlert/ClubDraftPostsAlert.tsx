import { ClubDraftPostsAlertFragment$key } from '@//:artifacts/ClubDraftPostsAlertFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { EditView, FileMultiple } from '@//:assets/icons'
import { Heading, HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: ClubDraftPostsAlertFragment$key
}

const Fragment = graphql`
  fragment ClubDraftPostsAlertFragment on Club {
    slug
    posts(first: 1, state: DRAFT) {
      edges {
        node {
          __typename
        }
      }
    }
  }
`

export default function ClubDraftPostsAlert ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const hasDraftPosts = data.posts.edges.length > 0

  if (!hasDraftPosts) {
    return <></>
  }

  return (
    <LinkTile href={{
      pathname: '/club/[slug]/posts',
      query: {
        slug: data.slug,
        state: 'DRAFT'
      }
    }}
    >
      <LargeBackgroundBox borderLeftWidth={3} borderLeftColor='orange.300'>
        <HStack align='center' justify='space-between'>
          <HStack align='center' spacing={3}>
            <Icon
              icon={FileMultiple}
              w={5}
              h={5}
              fill='gray.00'
            />
            <Heading color='gray.00' fontSize='lg'>
              <Trans>
                You have unpublished draft posts
              </Trans>
            </Heading>
          </HStack>
          <Icon
            icon={EditView}
            w={5}
            h={5}
            fill='gray.200'
          />
        </HStack>
      </LargeBackgroundBox>
    </LinkTile>
  )
}
