import { HeaderClubSupporterFragment$key } from '@//:artifacts/HeaderClubSupporterFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import ClubSupportLinks from './ClubSupportLinks/ClubSupportLinks'
import { StaticImageCover } from '@//:modules/content/HookedComponents/Media'

interface Props {
  rootQuery: HeaderClubSupporterFragment$key
}

const RootFragment = graphql`
  fragment HeaderClubSupporterFragment on Query {
    ...ClubSupportLinksFragment
  }
`

export default function HeaderClubSupporter (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <Box overflow='hidden' h='100%' position='relative' w='100%'>
      <Flex top={0} bottom={0} left={0} right={0} position='absolute'>
        <StaticImageCover
          variants={(
            <>
              <source
                media='(min-width: 760px)'
                srcSet='https://static.dollycdn.net/supporters/banners/1/large.jpg'
              />
              <source
                media='(min-width: 330px)'
                srcSet='https://static.dollycdn.net/supporters/banners/1/medium.jpg'
              />
            </>
          )}
          url='https://static.dollycdn.net/supporters/banners/1/small.jpg'
        />
      </Flex>
      <Center bg='dimmers.700' minH={300} py={24} position='relative' w='100%'>
        <Stack w='100%' align='center' justify='center' spacing={8}>
          <Heading
            textShadow='1px 1px 20px #000'
            maxW={500}
            textAlign='center'
            color='gray.00'
            fontSize={{
              base: '5xl',
              md: '7xl'
            }}
          >
            <Trans>
              BECOME A SUPPORTER
            </Trans>
          </Heading>
          <ClubSupportLinks rootQuery={rootData} />
        </Stack>
      </Center>
    </Box>
  )
}
