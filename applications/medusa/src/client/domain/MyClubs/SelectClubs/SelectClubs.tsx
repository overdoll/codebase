import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SelectClubsQuery } from '@//:artifacts/SelectClubsQuery.graphql'
import { useHistory } from '@//:modules/routing'
import ClubListSelector from './ClubListSelector/ClubListSelector'
import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ClubListSelectorFragment$key } from '@//:artifacts/ClubListSelectorFragment.graphql'
import ClubPreview from '../../../components/Posts/components/PostFlair/ClubPreview/ClubPreview'
import type { ClubPreviewFragment$key } from '@//:artifacts/ClubPreviewFragment.graphql'
import { Icon } from '@//:modules/content'
import { useParams } from '@//:modules/routing/useParams'
import generatePath from '@//:modules/routing/generatePath'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { ClickableBox } from '@//:modules/content/PageLayout'
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
    history.push('/')
  }

  return (
    <>
      <ClickableBox onClick={onOpen} p={1}>
        <Flex pr={2} align='center' w='100%' justify='space-between'>
          <ClubPreview query={queryData.club as ClubPreviewFragment$key} />
          <Icon icon={SwapCircle} h={5} w={5} fill='gray.300' />
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
