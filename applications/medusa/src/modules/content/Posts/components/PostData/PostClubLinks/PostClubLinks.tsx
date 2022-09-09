import { graphql, useFragment } from 'react-relay'
import type { PostClubLinksFragment$key } from '@//:artifacts/PostClubLinksFragment.graphql'
import { Flex, Grid, GridItem, Heading } from '@chakra-ui/react'
import { ExternalLink } from '../../../../../routing'
import ClickableTile from '../../../../ContentSelection/ClickableTile/ClickableTile'

interface Props {
  query: PostClubLinksFragment$key
}

const Fragment = graphql`
  fragment PostClubLinksFragment on Club {
    links {
      url
    }
  }
`

export default function PostClubLinks (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const shortenUrl = (url): string => {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '')
  }

  const links = data.links

  if (links.length === 0) {
    return <></>
  }

  return (
    <Grid
      templateColumns={`repeat(${links.length}, 1fr)`}
      templateRows='100%'
      gap={1}
    >
      {links.map((item) => (
        <GridItem overflow='hidden' key={item.url}>
          <ExternalLink href={item.url}>
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
        </GridItem>
      ))}
    </Grid>
  )
}
