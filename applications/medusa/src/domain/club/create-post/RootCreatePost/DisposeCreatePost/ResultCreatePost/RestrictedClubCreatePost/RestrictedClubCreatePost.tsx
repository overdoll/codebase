import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { BannerContainer, MobileContainer, PostPlaceholder } from '@//:modules/content/PageLayout'
import { RestrictedClubCreatePostFragment$key } from '@//:artifacts/RestrictedClubCreatePostFragment.graphql'
import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import ClubInformationBanner from '@//:common/components/ClubInformationBanner/ClubInformationBanner'
import CreatePostRichObject from '../MetaCreatePost/CreatePostRichObject/CreatePostRichObject'

interface Props {
  query: RestrictedClubCreatePostFragment$key
}

const Fragment = graphql`
  fragment RestrictedClubCreatePostFragment on Club {
    ...ClubInformationBannerFragment
  }
`

export default function RestrictedClubCreatePost ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <CreatePostRichObject />
      <BannerContainer pt={2}>
        <ClubInformationBanner query={data} />
      </BannerContainer>
      <MobileContainer>
        <PostPlaceholder>
          <Stack spacing={6}>
            <Box>
              <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
                <Trans>
                  Club Restricted
                </Trans>
              </Heading>
              <Text mb={8} textAlign='center' color='gray.100' fontSize='md'>
                <Trans>
                  You cannot post at this time due to a restriction on your club
                </Trans>
              </Text>
            </Box>
          </Stack>
        </PostPlaceholder>
      </MobileContainer>
    </>
  )
}
