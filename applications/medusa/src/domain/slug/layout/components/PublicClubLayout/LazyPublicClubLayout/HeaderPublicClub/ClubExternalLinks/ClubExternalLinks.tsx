import { graphql, useFragment } from 'react-relay'
import type { ClubExternalLinksFragment$key } from '@//:artifacts/ClubExternalLinksFragment.graphql'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import { ExternalLink } from '@//:modules/routing'
import ClickableTile from '@//:modules/content/ContentSelection/ClickableTile/ClickableTile'

interface Props {
  clubQuery: ClubExternalLinksFragment$key
}

const Fragment = graphql`
  fragment ClubExternalLinksFragment on Club {
    links {
      url
    }
  }
`

export default function ClubExternalLinks (props: Props): JSX.Element {
  const { clubQuery } = props

  const data = useFragment(Fragment, clubQuery)

  const shortenUrl = (url): string => {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '')
  }

  const links = data.links

  if (links.length === 0) {
    return <></>
  }

  return (
    <Stack
      spacing={1}
    >
      {links.map((item) => (
        <ExternalLink key={item.url} href={item.url}>
          <ClickableTile borderRadius='semi'>
            <Flex
              p={2}
              overflow='hidden'
              borderRadius='semi'
              w='100%'
              h='100%'
              align='center'
              justify='center'
              bg='gray.800'
            >
              <Heading
                noOfLines={1}
                color='gray.00'
                fontSize='sm'
                textAlign='center'
              >
                {shortenUrl(item.url)}
              </Heading>
            </Flex>
          </ClickableTile>
        </ExternalLink>
      ))}
    </Stack>
  )
}
