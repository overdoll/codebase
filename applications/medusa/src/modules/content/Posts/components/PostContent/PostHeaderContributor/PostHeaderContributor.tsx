import { Flex, Heading } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderContributorFragment$key } from '@//:artifacts/PostHeaderContributorFragment.graphql'
import { ClickableBox, ResourceIcon } from '../../../../PageLayout'
import { Link } from '../../../../../routing'

const Fragment = graphql`
  fragment PostHeaderContributorFragment on Post {
    contributor {
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
    <Link to={`/m/${data?.contributor?.username}`}>
      {({ isPending }) => (
        <ClickableBox isDisabled={isPending} bg='transparent' p={0}>
          <Flex align='center'>
            <ResourceIcon mr={3} query={data.contributor.avatar} />
            <Heading color='gray.00' fontSize='xl'>
              {data?.contributor?.username}
            </Heading>
          </Flex>
        </ClickableBox>
      )}
    </Link>
  )
}
