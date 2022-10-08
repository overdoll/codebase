import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Box, Flex } from '@chakra-ui/react'
import { ClubsDisplayQuery } from '@//:artifacts/ClubsDisplayQuery.graphql'
import FancyClubIcon from './FancyClubIcon/FancyClubIcon'

const Query = graphql`
  query ClubsDisplayQuery {
    clubs (first: 10, canSupport: true, terminated: false, suspended: false) {
      edges {
        node {
          id
          name
          ...FancyClubIcon
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
          <FancyClubIcon data={item.node} />
        </Box>
      ))}
    </Flex>
  )
}
