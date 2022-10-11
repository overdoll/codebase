import { graphql, useFragment } from 'react-relay/hooks'
import type { ContainerPublicPostFragment$key } from '@//:artifacts/ContainerPublicPostFragment.graphql'
import type { ContainerPublicPostViewerFragment$key } from '@//:artifacts/ContainerPublicPostViewerFragment.graphql'
import React from 'react'
import { ContentContainer, Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { OverlappingTemple, PremiumStar } from '@//:assets/icons'
import Button from '@//:modules/form/Button/Button'
import HighlightInline from '@//:modules/content/ContentHints/HighlightInline/HighlightInline'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import IconPattern
  from '../../../../../../../../modules/content/PageLayout/Display/components/RandomPattern/IconPattern/IconPattern'
import GridPaginationPost
  from '../../../../../../../../modules/content/HookedComponents/Post/components/VerticalPaginationScroller/GridPaginationScroller/GridPaginationPost/GridPaginationPost'
import { ClubTileOverlay } from '../../../../../../../../modules/content/ContentSelection'

interface Props {
  clubQuery: ContainerPublicPostFragment$key
  viewerQuery: ContainerPublicPostViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ContainerSupportClubFragment on Club {
    reference
    name
    slug
    ...ClubIconFragment
    ...ClubTileOverlayFragment
    posts(supporterOnlyStatus: [NONE, PARTIAL, FULL], first: 6) {
      edges {
        node {
          id
          ...GridPaginationPostFragment
        }
      }
    }
  }
`

const ViewerFragment = graphql`
  fragment ContainerSupportClubViewerFragment on Account {
    reference
  }
`

// Handle the layout of the page here and choose which components get a layout container
// so the user has a consistent experience
export default function ContainerSupportClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ContentContainer pt={2}>
      <Flex position='relative' padding={['75px 25px', '75px 45px', '75px 45px']} mb={2}>
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position='absolute'
          width='100%'
          height='100%'
          borderRadius={5}
        >
          <IconPattern
            opacity='0.05'
            zoom='large'
            icon={OverlappingTemple}
            fill='gray.00'
          />
        </Box>
        <Flex
          zIndex={10}
          mt={7}
          width='100%'
          flexDirection='column'
          textAlign='center'
        >
          <ClubIcon
            margin='0 auto'
            size='xl'
            clubQuery={clubData}
            mb={5}
          />
          <Heading color='gray.00' mb={5}>
            <Trans>
              <HighlightInline colorScheme='pink'>overdoll</HighlightInline> Premium
            </Trans>
          </Heading>
          <Button
            margin='auto'
            onClick={() => {
            }}
            colorScheme='orange'
            size='md'
            leftIcon={<Icon icon={PremiumStar} w={5} h={5} fill='orange.900' />}
          >
            <Trans>
              Get Premium
            </Trans>
          </Button>
        </Flex>
        <Box
          borderRadius={5}
          top={0}
          left={0}
          bottom={0}
          right={0}
          position='absolute'
          backgroundColor='rgba(0,0,0,0.1)'
          backgroundImage='linear-gradient(0deg,rgba(0,0,0,.7) 0,transparent 60%,rgba(0,0,0,.7))'
        />
      </Flex>
      <LargeBackgroundBox padding='45px 45px' p={2} mb={2}>
        <Heading color='gray.00' fontSize='2xl' mb={2}>
          <Trans>
            Exclusive access to <HighlightInline colorScheme='pink'>{clubData.name}</HighlightInline> Premium content
          </Trans>
        </Heading>
        <Text fontSize='lg' mb={5}>
          <Trans>
            Unlock exclusive content, with additional content posted every month
          </Trans>
        </Text>
        <Grid
          overflow='visible'
          rowGap={3}
          columnGap={3}
          templateColumns={{
            base: 'repeat(6, minmax(50px, 1fr))',
            lg: 'repeat(6, minmax(50px, 1fr))'
          }}
        >
          {clubData?.posts?.edges.map((item) => (
            <Box
              key={item.node.id}
              position='relative'
            >
              <Box pt='120%' />
              <Box top={0} w='100%' h='100%' position='absolute'>
                <GridPaginationPost query={item.node} />
              </Box>
            </Box>
          ))}
        </Grid>
      </LargeBackgroundBox>
      <LargeBackgroundBox padding='45px 45px' p={2} mb={2}>
        <Flex flexDirection='column'>
          <Heading color='gray.00' fontSize='2xl' mb={2} ml='auto'>
            <Trans>
              Unlock exclusive <HighlightInline colorScheme='pink'>overdoll</HighlightInline> Features
            </Trans>
          </Heading>
          <Text fontSize='lg' ml='auto'>
            <Trans>
              Unlock sort by Top and New, view your saved posts
            </Trans>
          </Text>
        </Flex>
      </LargeBackgroundBox>
      <LargeBackgroundBox padding='45px 45px' p={2} mb={2}>
        <Flex flexDirection='column'>
          <Heading color='gray.00' fontSize='2xl' mb={2}>
            <Trans>
              Support future development of <HighlightInline colorScheme='pink'>overdoll</HighlightInline>
            </Trans>
          </Heading>
          <Text fontSize='lg'>
            <Trans>
              overdoll is a platform made for you. Help us grow!
            </Trans>
          </Text>
        </Flex>
      </LargeBackgroundBox>
      <LargeBackgroundBox padding='45px 45px' p={2} mb={2}>
        <Flex flexDirection='column' textAlign='center'>
          <Heading color='gray.00' fontSize='3xl' mb={2}>
            <Trans>
              Your Premium Membership
            </Trans>
          </Heading>
        </Flex>
        <Box>
          <ClubTileOverlay query={clubData} />
        </Box>
        <LargeBackgroundBox backgroundColor='gray.900' padding='45px 45px' p={2} mt={4}>
          <Flex flexDirection='column'>
            <Text color='gray.00'>
              Access exclusive content posted by {clubData.name}
            </Text>
            <Text color='gray.00'>
              Receive premium overdoll platform features
            </Text>
            <Text color='gray.00'>
              Support the overdoll platform and ecosystem
            </Text>
          </Flex>
        </LargeBackgroundBox>

      </LargeBackgroundBox>
    </ContentContainer>
  )
}
