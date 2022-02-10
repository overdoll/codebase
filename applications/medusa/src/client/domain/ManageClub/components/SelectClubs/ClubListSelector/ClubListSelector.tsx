import { graphql, usePaginationFragment } from 'react-relay'
import { ClubListSelectorFragment$key } from '@//:artifacts/ClubListSelectorFragment.graphql'
import {
  GridTile,
  GridWrap,
  LoadMoreGridTile,
  SingleSelector,
  useSingleSelector
} from '../../../../../../modules/content/ContentSelection'
import { SelectClubsQuery } from '@//:artifacts/SelectClubsQuery.graphql'
import ClubTileOverlay
  from '../../../../../../modules/content/ContentSelection/components/TileOverlay/ClubTileOverlay/ClubTileOverlay'
import { useHistoryDisclosure } from '@//:modules/hooks'
import generatePath from '../../../../../../modules/routing/generatePath'
import { useHistory, useParams } from '@//:modules/routing'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { ReactNode } from 'react'

interface Props {
  query: ClubListSelectorFragment$key | null
  children: ReactNode
}

const Fragment = graphql`
  fragment ClubListSelectorFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "ClubListSelectorPaginationFragment" )
  {
    clubs (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "ClubListSelector_clubs")
    {
      edges {
        node {
          slug
          ...ClubTileOverlayFragment
        }
      }
    }
  }
`

export default function ClubListSelector ({
  query,
  children
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SelectClubsQuery, any>(
    Fragment,
    query
  )

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const params = useParams()

  const history = useHistory()

  const [currentSelection, setCurrentSelection] = useSingleSelector({ defaultValue: params.slug })

  const onChange = (id): void => {
    onClose()
    const newPath = generatePath('/club/:slug/:entity', {
      slug: id,
      entity: params.entity
    })

    history.push(newPath)
  }

  const onSelect = (id): void => {
    onChange(id)
    if (currentSelection === id) return
    setCurrentSelection(id)
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
        {children}
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
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody mb={4}>
            <GridWrap>
              {data.clubs.edges.map((item, index) => (
                <GridTile key={index}>
                  <SingleSelector
                    onSelect={onSelect}
                    selected={(currentSelection != null) ? [currentSelection] : []}
                    id={item.node.slug}
                  >
                    <ClubTileOverlay query={item.node} />
                  </SingleSelector>
                </GridTile>
              )
              )}
              <LoadMoreGridTile
                hasNext={hasNext}
                onLoadNext={() => loadNext(3)}
                isLoadingNext={isLoadingNext}
              />
            </GridWrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
