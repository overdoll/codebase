import { graphql, useFragment } from 'react-relay/hooks'
import { ClickableCharacterFragment$key } from '@//:artifacts/ClickableCharacterFragment.graphql'
import { Heading, HStack } from '@chakra-ui/react'
import { ResourceIcon, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'

interface Props {
  query: ClickableCharacterFragment$key
}

const Fragment = graphql`
  fragment ClickableCharacterFragment on Character {
    id
    name
    slug
    series {
      slug
    }
    banner {
      ...ResourceIconFragment
    }
  }
`

export default function ClickableCharacter ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <LinkTile
      href={{
        pathname: '/search/series/[seriesSlug]/[characterSlug]',
        query: {
          characterSlug: data.slug,
          seriesSlug: data.series?.slug
        }
      }}
      p={0}
    >
      <SmallBackgroundBox p={2} borderRadius='inherit'>
        <HStack spacing={2} align='center'>
          <ResourceIcon
            showBorder
            seed={data.id}
            w={8}
            h={8}
            query={data.banner as ResourceIconFragment$key}
          />
          <Heading noOfLines={1} color='gray.100' fontSize='xl'>
            {data.name}
          </Heading>
        </HStack>
      </SmallBackgroundBox>
    </LinkTile>
  )
}
