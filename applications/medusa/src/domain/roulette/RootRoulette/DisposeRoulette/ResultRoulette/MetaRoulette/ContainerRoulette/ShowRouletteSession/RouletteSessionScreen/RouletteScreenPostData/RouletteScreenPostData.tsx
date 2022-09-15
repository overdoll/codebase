import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenPostDataFragment$key } from '@//:artifacts/RouletteScreenPostDataFragment.graphql'
import { graphql } from 'react-relay'
import { Flex, Heading, HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ResourceIcon } from '@//:modules/content/PageLayout'
import { LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: RouletteScreenPostDataFragment$key
}

const Fragment = graphql`
  fragment RouletteScreenPostDataFragment on Post {
    reference
    characters {
      id
      name
      banner {
        ...ResourceIconFragment
      }
    }
    club {
      id
      slug
      name
      banner {
        ...ResourceIconFragment
      }
    }
  }
`

export default function RouletteScreenPostData (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  return (
    <Flex position='absolute' zIndex={2} top={0} opacity={0.2} right={0}>
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
            {data.characters[0].banner != null && (
              <ResourceIcon query={data.characters[0].banner} seed={data.characters[0].id} w={4} h={4} />
            )}
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
            {data.club.banner != null && (
              <ResourceIcon query={data.club.banner} seed={data.club.id} w={4} h={4} />
            )}
            <Heading noOfLines={1} fontSize='md' color='gray.00'>
              {data.club.name}
            </Heading>
          </HStack>
        </HStack>
      </LinkTile>
    </Flex>
  )
}
