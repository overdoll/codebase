import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ProfileQuery } from '@//:artifacts/ProfileQuery.graphql'
import { graphql } from 'react-relay'
import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { NotFoundAccount } from '@//:modules/content/Placeholder'
import ProfileMenu from './ProfileMenu/ProfileMenu'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '../../../../modules/content/Placeholder/NotFound/NotFoundFooter/NotFoundFooter'
import ProfileRichObject from '../../../../common/rich-objects/profile/ProfileRichObject/ProfileRichObject'
import AccountIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/AccountIcon/AccountIcon'
import CoverImage
  from '@//:modules/content/HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '@//:modules/content/PageLayout/Display/components/RandomPattern/RandomPattern'

interface Props {
  query: PreloadedQuery<ProfileQuery>
}

const Query = graphql`
  query ProfileQuery($username: String!) @preloadable {
    account(username: $username) {
      id
      isDeleted
      username
      ...AccountIconFragment
      ...ProfileMenuFragment
      ...ProfileRichObjectFragment
    }
  }
`

export default function Profile (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ProfileQuery>(
    Query,
    props.query
  )

  if (queryData.account == null) {
    return <NotFoundAccount />
  }

  if (queryData?.account.isDeleted) {
    return (
      <Center>
        <Stack spacing={8}>
          <Heading fontSize='2xl' color='gray.00'>
            <Trans>
              This account was deleted
            </Trans>
          </Heading>
          <NotFoundFooter />
        </Stack>
      </Center>
    )
  }

  return (
    <>
      <ProfileRichObject accountQuery={queryData.account} />
      <Stack spacing={8}>
        <Box h={200}>
          <TileOverlay
            backdrop={(
              <CoverImage>
                <RandomPattern seed={queryData?.account?.id} />
              </CoverImage>
            )}
          >
            <Flex p={2} h='100%' w='100%' align='center' justify='center' position='relative'>
              <Stack align='center' p={4} spacing={2}>
                <AccountIcon size='xl' accountQuery={queryData?.account} />
                <Heading fontFamily='mono' color='gray.00' fontSize='4xl'>
                  {queryData?.account?.username}
                </Heading>
              </Stack>
              <Flex top={2} right={2} position='absolute'>
                <ProfileMenu query={queryData?.account} />
              </Flex>
            </Flex>
          </TileOverlay>
        </Box>
      </Stack>
    </>
  )
}
