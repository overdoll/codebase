import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SelectClubsQuery } from '@//:artifacts/SelectClubsQuery.graphql'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import ClubPreview from '../ClubPreview/ClubPreview'
import type { ClubPreviewFragment$key } from '@//:artifacts/ClubPreviewFragment.graphql'
import { Icon } from '@//:modules/content/PageLayout'
import { SwapCircle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import MultipleClubsModal from './MultipleClubsModal/MultipleClubsModal'
import SuspendedClubBanner from './SuspendedClubBanner/SuspendedClubBanner'

interface Props {
  query: PreloadedQuery<SelectClubsQuery>
}

const Query = graphql`
  query SelectClubsQuery($slug: String!) {
    club(slug: $slug) {
      slug
      ...ClubPreviewFragment
      ...SuspendedClubBannerFragment
      owner {
        id
      }
    }
    viewer {
      id
      clubsCount
    }
  }
`

const flexProps = {
  borderRadius: 'md',
  bg: 'gray.900',
  h: 16,
  p: 2,
  px: 3,
  align: 'center',
  w: '100%',
  justify: 'space-between'
}

export default function SelectClubs ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<SelectClubsQuery>(
    Query,
    query
  )

  if (queryData.club == null || queryData.viewer == null) {
    return (
      <MultipleClubsModal>
        <Flex {...flexProps}>
          <Heading color='gray.00' fontSize='lg'>
            <Trans>
              Club Not Found
            </Trans>
          </Heading>
          <Icon ml={3} icon={SwapCircle} h={5} w={5} fill='gray.300' />
        </Flex>
      </MultipleClubsModal>
    )
  }

  if (queryData?.viewer.id !== queryData?.club.owner.id) {
    return (
      <Flex {...flexProps}>
        <Heading color='gray.00' fontSize='lg'>
          <Trans>
            Club Not Found
          </Trans>
        </Heading>
      </Flex>
    )
  }

  if (queryData?.viewer?.clubsCount <= 1) {
    return (
      <Stack spacing={2}>
        <Flex {...flexProps}>
          <ClubPreview query={queryData.club as ClubPreviewFragment$key} />
        </Flex>
        <SuspendedClubBanner query={queryData.club} />
      </Stack>
    )
  }

  return (
    <MultipleClubsModal>
      <Stack spacing={2}>
        <Flex {...flexProps}>
          <ClubPreview query={queryData.club as ClubPreviewFragment$key} />
          <Icon ml={3} icon={SwapCircle} h={5} w={5} fill='gray.300' />
        </Flex>
        <SuspendedClubBanner query={queryData.club} />
      </Stack>
    </MultipleClubsModal>
  )
}
