import { BannerPublicClubFragment$key } from '@//:artifacts/BannerPublicClubFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Flex, Grid, GridItem, HStack } from '@chakra-ui/react'
import BannerPublicClubMedia from './BannerPublicClubMedia/BannerPublicClubMedia'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import { ContentContainer } from '@//:modules/content/PageLayout'
import MenuPublicClub from './MenuPublicClub/MenuPublicClub'
import SharePublicClub from './SharePublicClub/SharePublicClub'
import ClubHeader from '@//:modules/content/HookedComponents/Club/fragments/ClubHeader/ClubHeader'

interface Props {
  clubQuery: BannerPublicClubFragment$key
}

const ClubFragment = graphql`
  fragment BannerPublicClubFragment on Club {
    posts(sortBy: TOP, first: 3) {
      edges {
        node {
          id
          content {
            media {
              ...BannerPublicClubMediaFragment
            }
          }
        }
      }
    }
    header {
      __typename
    }
    ...ClubHeaderFragment
    ...ClubIconFragment
    ...MenuPublicClubFragment
    ...SharePublicClubFragment
  }
`

export default function BannerPublicClub (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  return (
    <Box position='relative'>
      <Flex
        h='100%'
        w='100%'
        align='center'
        justify='center'
        minH='200px'
        maxH='30vh'
        overflow='hidden'
      >
        {clubData.header != null
          ? (
            <ClubHeader clubQuery={clubData} />
            )
          : (
            <Grid
              overflow='hidden'
              h='100%'
              w='100%'
              minH='inherit'
              maxH='inherit'
              templateColumns='1fr 1fr 1fr'
              templateRows='100%'
            >
              {clubData.posts.edges.map((item) => (
                <GridItem
                  h='100%'
                  w='100%'
                  overflow='hidden'
                  key={item.node.id}
                >
                  <BannerPublicClubMedia mediaQuery={item.node.content[0].media} />
                </GridItem>
              ))}
            </Grid>
            )}
      </Flex>

      <Box bg='dimmers.200' position='absolute' bottom={0} left={0} right={0} top={0}>
        <ContentContainer h='100%'>
          <Flex align='flex-end' h='100%' w='100%'>
            <Flex w='100%' align='flex-end' justify='space-between'>
              <Box transform='translateY(15px)'>
                <ClubIcon borderColor='gray.900' borderWidth={3} size='2xl' clubQuery={clubData} />
              </Box>
              <HStack>
                <SharePublicClub clubQuery={clubData} />
                <MenuPublicClub clubQuery={clubData} />
              </HStack>
            </Flex>
          </Flex>
        </ContentContainer>
      </Box>
    </Box>
  )
}
