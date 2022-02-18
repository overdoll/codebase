import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SelectClubsQuery } from '@//:artifacts/SelectClubsQuery.graphql'
import ClubListSelector from './MultipleClubsModal/ClubListSelector/ClubListSelector'
import { Flex, Heading } from '@chakra-ui/react'
import ClubPreview from '../ClubPreview/ClubPreview'
import type { ClubPreviewFragment$key } from '@//:artifacts/ClubPreviewFragment.graphql'
import { Icon } from '@//:modules/content/PageLayout'
import { SwapCircle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import MultipleClubsModal from './MultipleClubsModal/MultipleClubsModal'

interface Props {
  query: PreloadedQuery<SelectClubsQuery>
}

const Query = graphql`
  query SelectClubsQuery($slug: String!) {
    club(slug: $slug) {
      slug
      ...ClubPreviewFragment
    }
    viewer {
      clubsCount
    }
  }
`

export default function SelectClubs ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<SelectClubsQuery>(
    Query,
    query
  )

  if (queryData.club == null) {
    return (
      <MultipleClubsModal>
        <Flex borderRadius='md' bg='gray.900' h={16} p={2} px={3} align='center' w='100%' justify='space-between'>
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

  if (queryData?.viewer !== null && queryData?.viewer?.clubsCount <= 1) {
    return (
      <Flex borderRadius='md' bg='gray.900' h={16} p={2} px={3} align='center' w='100%' justify='space-between'>
        <ClubPreview query={queryData.club as ClubPreviewFragment$key} />
      </Flex>
    )
  }

  return (
    <MultipleClubsModal>
      <Flex borderRadius='md' bg='gray.900' h={16} p={2} px={3} align='center' w='100%' justify='space-between'>
        <ClubPreview query={queryData.club as ClubPreviewFragment$key} />
        <Icon ml={3} icon={SwapCircle} h={5} w={5} fill='gray.300' />
      </Flex>
    </MultipleClubsModal>
  )
}
