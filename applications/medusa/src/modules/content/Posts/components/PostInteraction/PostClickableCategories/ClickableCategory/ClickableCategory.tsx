import { graphql, useFragment } from 'react-relay/hooks'
import { ClickableCategoryFragment$key } from '@//:artifacts/ClickableCategoryFragment.graphql'
import { Heading, HStack } from '@chakra-ui/react'
import { ResourceIcon, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: ClickableCategoryFragment$key
}

const Fragment = graphql`
  fragment ClickableCategoryFragment on Category {
    id
    title
    slug
    thumbnail {
      ...ResourceIconFragment
    }
  }
`

export default function ClickableCategory ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <LinkTile
      href={{
        pathname: '/search/category/[categorySlug]',
        query: {
          categorySlug: data.slug
        }
      }}
      p={0}
    >
      <SmallBackgroundBox borderRadius='inherit' align='center' p={1}>
        <HStack align='center' mr={1} spacing={2}>
          <ResourceIcon showBorder w={6} h={6} seed={data.id} query={data.thumbnail} />
          <Heading color='gray.100' fontSize='md'>{data.title}</Heading>
        </HStack>
      </SmallBackgroundBox>
    </LinkTile>
  )
}
