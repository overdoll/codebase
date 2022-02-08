import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SelectClubsQuery } from '@//:artifacts/SelectClubsQuery.graphql'
import { useHistory } from '@//:modules/routing'
import ClubListSelector from './ClubListSelector/ClubListSelector'
import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ClubListSelectorFragment$key } from '@//:artifacts/ClubListSelectorFragment.graphql'
import ClubPreview from '../ClubPreview/ClubPreview'
import type { ClubPreviewFragment$key } from '@//:artifacts/ClubPreviewFragment.graphql'
import { useParams } from '@//:modules/routing/useParams'
import generatePath from '@//:modules/routing/generatePath'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { ClickableBox, Icon } from '@//:modules/content/PageLayout'
import { SwapCircle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'

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
      ...ClubListSelectorFragment
    }
  }
`

export default function SelectClubs ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<SelectClubsQuery>(
    Query,
    query
  )

  const params = useParams()

  const history = useHistory()

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const onChange = (id): void => {
    onClose()
    const newPath = generatePath('/club/:slug/:entity', {
      slug: id,
      entity: params.entity
    })

    history.push(newPath)
  }

  if (queryData.club == null) {
    return <></>
  }

  if (queryData?.viewer !== null && queryData?.viewer?.clubsCount <= 1) {
    return (
      <Flex h='100%' p={2} borderRadius='md' bg='gray.900' px={2} align='center' w='100%' justify='space-between'>
        <ClubPreview query={queryData.club as ClubPreviewFragment$key} />
      </Flex>
    )
  }

  return (
    <>
      <ClickableBox
        variant='ghost'
        _hover={{ bg: 'gray.900' }}
        _active={{ bg: 'gray.900' }}
        borderRadius='md'
        h='100%'
        onClick={onOpen}
        p={0}
      >
        <Flex h='100%' p={2} borderRadius='md' bg='gray.900' px={2} align='center' w='100%' justify='space-between'>
          <ClubPreview query={queryData.club as ClubPreviewFragment$key} />
          <Icon ml={3} icon={SwapCircle} h={5} w={5} fill='gray.300' />
        </Flex>
      </ClickableBox>
      <Modal
        isCentered
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Switch to club
            </Trans>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <ClubListSelector
              initialSelection={params.slug}
              query={queryData.viewer as ClubListSelectorFragment$key}
              onChange={onChange}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
