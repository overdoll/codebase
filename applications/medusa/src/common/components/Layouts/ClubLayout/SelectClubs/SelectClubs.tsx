import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { SelectClubsQuery } from '@//:artifacts/SelectClubsQuery.graphql'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import ClubPreview from './ClubPreview/ClubPreview'
import type { ClubPreviewFragment$key } from '@//:artifacts/ClubPreviewFragment.graphql'
import { Icon } from '@//:modules/content/PageLayout'
import { SwapCircle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import MultipleClubsModal from './MultipleClubsModal/MultipleClubsModal'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query SelectClubsQuery($slug: String!) {
    club(slug: $slug) {
      viewerIsOwner
      slug
      ...ClubPreviewFragment
      ...SuspendedClubBannerFragment
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

export default function SelectClubs ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SelectClubsQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
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

  if (!queryData?.club.viewerIsOwner) {
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
      </Stack>
    )
  }

  return (
    <Stack spacing={2}>
      <MultipleClubsModal>
        <Flex {...flexProps}>
          <ClubPreview query={queryData.club as ClubPreviewFragment$key} />
          <Icon ml={3} icon={SwapCircle} h={5} w={5} fill='gray.300' />
        </Flex>
      </MultipleClubsModal>
    </Stack>
  )
}
