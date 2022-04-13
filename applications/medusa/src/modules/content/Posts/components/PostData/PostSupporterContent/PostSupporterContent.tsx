import { graphql, useFragment } from 'react-relay'
import { ReactNode } from 'react'
import { PostSupporterContentFragment$key } from '@//:artifacts/PostSupporterContentFragment.graphql'
import { PostSupporterContentClubFragment$key } from '@//:artifacts/PostSupporterContentClubFragment.graphql'
import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import { PremiumStar } from '@//:assets/icons'
import { Icon } from '../../../../PageLayout'
import { Trans } from '@lingui/macro'
import LinkButton from '../../../../ThemeComponents/LinkButton/LinkButton'
import Can from '../../../../../authorization/Can'

interface Props {
  query: PostSupporterContentFragment$key
  clubQuery: PostSupporterContentClubFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment PostSupporterContentFragment on PostContent {
    viewerCanViewSupporterOnlyContent
    isSupporterOnly
  }
`

const ClubFragment = graphql`
  fragment PostSupporterContentClubFragment on Club {
    slug
  }
`

export default function PostSupporterContent ({
  query,
  children,
  clubQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const clubData = useFragment(ClubFragment, clubQuery)

  return (
    <>
      {(data.isSupporterOnly && data.viewerCanViewSupporterOnlyContent) && (
        <HStack align='center' spacing={1}>
          <Icon
            p={1}
            icon={PremiumStar}
            fill='orange.400'
            h={7}
            w={7}
          />
          <Heading lineHeight={1} fontSize='md' color='gray.00'>
            <Trans>
              Exclusive Supporter Content
            </Trans>
          </Heading>
        </HStack>)}
      {!data.viewerCanViewSupporterOnlyContent
        ? (
          <Box w='100%' h='100%' position='relative'>
            {children}
            <Stack
              bg='dimmers.400'
              h='100%'
              w='100%'
              top={0}
              right={0}
              position='absolute'
              align='center'
              justify='center'
              px={8}
              spacing={4}
            >
              <Heading fontSize='lg' color='gray.00' textAlign='center'>
                <Trans>
                  This content can only be seen if you are a supporter of the club
                </Trans>
              </Heading>
              <Can I='interact' a='Club' passThrough>
                {allowed => (
                  <LinkButton
                    to={allowed === false ? `/${clubData.slug}` : `/${clubData.slug}?support=true`}
                    leftIcon={(
                      <Icon
                        icon={PremiumStar}
                        fill='orange.900'
                        h={4}
                        w={4}
                      />)}
                    size='lg'
                    colorScheme='orange'
                  >
                    <Trans>
                      Become a Supporter
                    </Trans>
                  </LinkButton>
                )}
              </Can>
            </Stack>
          </Box>)
        : children}
    </>
  )
}
