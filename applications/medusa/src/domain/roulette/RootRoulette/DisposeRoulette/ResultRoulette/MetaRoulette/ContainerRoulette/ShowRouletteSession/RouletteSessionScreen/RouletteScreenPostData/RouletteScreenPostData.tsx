import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenPostDataFragment$key } from '@//:artifacts/RouletteScreenPostDataFragment.graphql'
import { graphql } from 'react-relay'
import { Flex, Heading, HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LinkTile } from '@//:modules/content/ContentSelection'
import CharacterIcon from '@//:modules/content/PageLayout/Display/fragments/CharacterIcon/CharacterIcon'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/ClubIcon/ClubIcon'

interface Props {
  query: RouletteScreenPostDataFragment$key
}

const Fragment = graphql`
  fragment RouletteScreenPostDataFragment on Post {
    reference
    characters {
      id
      name
      ...CharacterIconFragment
    }
    club {
      slug
      name
      ...ClubIconFragment
    }
  }
`

export default function RouletteScreenPostData (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  return (
    <Flex position='absolute' left={0} top={0} zIndex={2} opacity={0.2}>
      <LinkTile href={{
        pathname: '/[slug]/post/[reference]',
        query: {
          slug: data.club.slug,
          reference: data.reference
        }
      }}
      >
        <HStack spacing={2}>
          <HStack align='center' spacing={1}>
            <CharacterIcon size='sm' clubQuery={data.characters[0]} />
            <Heading noOfLines={1} fontSize='md' color='gray.00'>
              {data.characters[0].name}
            </Heading>
          </HStack>
          <Heading fontSize='md' color='gray.100'>
            <Trans>
              by
            </Trans>
          </Heading>
          <HStack align='center' spacing={1}>
            <ClubIcon size='sm' clubQuery={data.club} />
            <Heading noOfLines={1} fontSize='md' color='gray.00'>
              {data.club.name}
            </Heading>
          </HStack>
        </HStack>
      </LinkTile>
    </Flex>
  )
}
