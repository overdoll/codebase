import { graphql, useFragment } from 'react-relay/hooks'
import { ClubCharacterRecommendationsFragment$key } from '@//:artifacts/ClubCharacterRecommendationsFragment.graphql'
import { Heading, HStack } from '@chakra-ui/react'
import { Icon, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { ArrowButtonRight } from '@//:assets/icons'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

interface Props {
  query: ClubCharacterRecommendationsFragment$key
}

const Fragment = graphql`
  fragment ClubCharacterRecommendationsFragment on Club {
    name
    slug
    ...ClubIconFragment
  }
`

export default function ClubCharacterRecommendations ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <LinkTile href={{
      pathname: '/[slug]',
      query: {
        slug: data.slug
      }
    }}
    >
      <SmallBackgroundBox>
        <HStack spacing={2} justify='space-between'>
          <HStack spacing={2}>
            <ClubIcon size='md' clubQuery={data} />
            <Heading color='gray.100' fontSize='xl'>
              {data.name}
            </Heading>
          </HStack>
          <Icon icon={ArrowButtonRight} w={4} h={4} fill='gray.200' />
        </HStack>
      </SmallBackgroundBox>
    </LinkTile>
  )
}
