import { Heading, HStack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderContributorFragment$key } from '@//:artifacts/PostHeaderContributorFragment.graphql'
import { ClickableBox } from '../../../../PageLayout'
import { Link } from '../../../../../routing'
import AccountIcon from '../../../../PageLayout/Display/fragments/AccountIcon/AccountIcon'

const Fragment = graphql`
  fragment PostHeaderContributorFragment on Post {
    contributor {
      username
      ...AccountIconFragment
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
        <HStack spacing={3} align='center'>
          <AccountIcon size='md' accountQuery={data?.contributor} />
          <Heading color='gray.00' fontSize='xl'>
            {data?.contributor?.username}
          </Heading>
        </HStack>
      </ClickableBox>
    </Link>
  )
}
