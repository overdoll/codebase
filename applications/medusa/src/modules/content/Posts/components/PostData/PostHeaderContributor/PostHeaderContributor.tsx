import { Flex, Heading } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderContributorFragment$key } from '@//:artifacts/PostHeaderContributorFragment.graphql'
import { ClickableBox, ResourceIcon } from '../../../../PageLayout'
import { Link } from '../../../../../routing'

const Fragment = graphql`
  fragment PostHeaderContributorFragment on Post {
    contributor {
      id
      username
      avatar {
        ...ResourceIconFragment
      }
    }
  }
`

interface Props {
  query: PostHeaderContributorFragment$key
}

export default function PostHeaderContributor ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Link
      href={{
        pathname: '/profile/[username]',
        query: { username: data?.contributor?.username }
      }}
    >
      <ClickableBox bg='transparent' p={0}>
        <Flex align='center'>
          <ResourceIcon
            showBorder
            seed={data.contributor.id}
            mr={3}
            query={data.contributor.avatar}
          />
          <Heading color='gray.00' fontSize='xl'>
            {data?.contributor?.username}
          </Heading>
        </Flex>
      </ClickableBox>
    </Link>
  )
}
