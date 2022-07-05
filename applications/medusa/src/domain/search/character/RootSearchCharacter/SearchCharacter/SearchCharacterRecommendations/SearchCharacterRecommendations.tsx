import { graphql, useFragment } from 'react-relay/hooks'
import {
  SearchCharacterRecommendationsFragment$key
} from '@//:artifacts/SearchCharacterRecommendationsFragment.graphql'
import { Heading, HStack } from '@chakra-ui/react'
import { Icon, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { ArrowButtonRight } from '@//:assets/icons'

interface Props {
  query: SearchCharacterRecommendationsFragment$key
}

const Fragment = graphql`
  fragment SearchCharacterRecommendationsFragment on Character {
    series {
      title
      slug
    }
  }
`

export default function SearchCharacterRecommendations ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <LinkTile href={{
      pathname: '/search/series/[seriesSlug]',
      query: {
        seriesSlug: data.series.slug
      }
    }}
    >
      <SmallBackgroundBox>
        <HStack spacing={2} justify='space-between'>
          <Heading color='gray.100' fontSize='md'>
            {data.series.title}
          </Heading>
          <Icon icon={ArrowButtonRight} w={4} h={4} fill='gray.200' />
        </HStack>
      </SmallBackgroundBox>
    </LinkTile>
  )
}
