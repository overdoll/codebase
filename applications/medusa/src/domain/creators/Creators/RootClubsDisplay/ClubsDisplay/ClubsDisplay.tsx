import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Box, Flex } from '@chakra-ui/react'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import { ClubsDisplayQuery } from '@//:artifacts/ClubsDisplayQuery.graphql'

const Query = graphql`
  query ClubsDisplayQuery {
    clubs (first: 10, canSupport: true) {
      edges {
        node {
          id
          name
          ...ClubIconFragment
          thumbnailMedia {
            ... on ImageMedia {
              colorPalettes {
                red
                green
                blue
              }
            }
          }
        }
      }
    }
  }
`

export default function ClubsDisplay (): JSX.Element {
  const data = useLazyLoadQuery<ClubsDisplayQuery>(Query, {})

  return (
    <Flex
      width='100%'
      justifyContent='center'
    >
      {data.clubs.edges.map((item) => (
        <Box key={item.node.id} alignSelf='center' ml={3} mr={3} justifySelf='center'>
          <ClubIcon size='xl' clubQuery={item.node} />
        </Box>))}
    </Flex>
  )
}
