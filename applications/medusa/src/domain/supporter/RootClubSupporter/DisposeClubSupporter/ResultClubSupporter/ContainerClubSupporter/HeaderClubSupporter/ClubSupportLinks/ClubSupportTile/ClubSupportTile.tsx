import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { ClubSupportTileAccountFragment$key } from '@//:artifacts/ClubSupportTileAccountFragment.graphql'
import { ClubSupportTileClubFragment$key } from '@//:artifacts/ClubSupportTileClubFragment.graphql'
import { useJoin } from '../../../../../../../../app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'
import { Box, Center, Flex, Grid, GridItem, Heading, WrapItem } from '@chakra-ui/react'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useRouter } from 'next/router'

interface Props {
  accountQuery: ClubSupportTileAccountFragment$key | null
  clubQuery: ClubSupportTileClubFragment$key
}

const AccountFragment = graphql`
  fragment ClubSupportTileAccountFragment on Account {
    __typename
  }
`

const ClubFragment = graphql`
  fragment ClubSupportTileClubFragment on Club {
    name
    slug
    ...ClubIconFragment
    ...ClubBannerFragment
  }
`

export default function ClubSupportTile (props: Props): JSX.Element {
  const {
    accountQuery,
    clubQuery
  } = props

  const accountData = useFragment(AccountFragment, accountQuery)
  const clubData = useFragment(ClubFragment, clubQuery)

  const router = useRouter()

  const clubLink = {
    pathname: '/[slug]',
    query: {
      slug: clubData.slug,
      support: true
    }
  }

  const onJoin = useJoin(clubLink, 'supporter_page')

  const onSupport = (): void => {
    if (accountData == null) {
      onJoin()
      return
    }
    void router.push(clubLink)
  }

  return (
    <WrapItem cursor='pointer' onClick={onSupport}>
      <Box h={210} w={170} pointerEvents='none' position='relative'>
        <Box
          borderRadius='lg'
          bg='dimmers.500'
          top={0}
          bottom={0}
          left={0}
          right={0}
          position='absolute'
        />
        <Grid
          px={4}
          py={2}
          w='100%'
          h='100%'
          gap={4}
          position='relative'
          templateRows='1fr 1fr 1fr'
        >
          <GridItem overflow='hidden'>
            <Flex h='100%' align='flex-end' justify='center'>
              <Heading noOfLines={2} textAlign='center' fontSize='lg' color='gray.00'>
                {clubData.name}
              </Heading>
            </Flex>
          </GridItem>
          <GridItem>
            <Center w='100%'>
              <ClubIcon size='xl' clubQuery={clubData} />
            </Center>
          </GridItem>
          <GridItem overflow='hidden'>
            <Button w='100%' colorScheme='white' size='md' borderRadius='lg'>
              <Trans>
                Support Now
              </Trans>
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </WrapItem>
  )
}
