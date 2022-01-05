import { graphql, usePaginationFragment } from 'react-relay'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { ClubSelectorQuery } from '@//:artifacts/ClubSelectorQuery.graphql'
import { ClickableBox, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Collapse,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Link } from '@//:modules/routing'
import { useContext, useEffect } from 'react'
import { DispatchContext, StateContext } from '../../context'
import { RowItem, RowWrap, Selector, useSingleSelector } from '../../../../../../components/ContentSelection'
import { EVENTS } from '../../constants/constants'
import ClubPreview from '../../../../../../components/Posts/components/PostFlair/ClubPreview/ClubPreview'

const Query = graphql`
  query ClubSelectorQuery {
    viewer {
      ...ClubSelectorFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubSelectorFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "ClubSelectorPaginationFragment" )
  {
    clubs (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "ClubSelector_clubs")
    {
      edges {
        node {
          id
          name
          slug
          ...ClubPreviewFragment
        }
      }
    }
  }
`

export default function ClubSelector (): JSX.Element {
  const queryData = useLazyLoadQuery<ClubSelectorQuery>(
    Query,
    {}
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<ClubSelectorQuery, any>(
    Fragment,
    queryData.viewer
  )

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const clubIsSelected = state.club !== null

  const {
    isOpen,
    onToggle,
    onClose
  } = useDisclosure({ defaultIsOpen: !clubIsSelected })

  const [currentSelection, setCurrentSelection] = useSingleSelector({ initialSelection: null })

  const currentClubSelection = data.clubs.edges.filter((item) => item.node.id === currentSelection)

  const onSelect = (id): void => {
    setCurrentSelection(id)
    if (currentSelection === id) return
    onClose()
  }

  useEffect(() => {
    dispatch({
      type: EVENTS.CLUB,
      value: currentSelection
    })
  }, [currentSelection])

  if (data.clubs.edges.length < 1) {
    return (
      <SmallBackgroundBox>
        <Stack>
          <Alert status='warning'>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                You don't have any clubs. You need to have access to at least one before you can create a post.
              </Trans>
            </AlertDescription>
          </Alert>
          <Link to='/manage/clubs'>
            <Button
              w='100%'
              colorScheme='orange'
              variant='solid'
              size='lg'
            ><Trans>
              Create a Club
            </Trans>
            </Button>
          </Link>
        </Stack>
      </SmallBackgroundBox>
    )
  }

  return (
    <Stack spacing={2}>
      <SmallBackgroundBox>
        <Flex h={12} justify='space-between' align='center'>
          {currentClubSelection.length < 1
            ? <Heading fontSize='2xl' color='gray.00'>
              <Trans>
                No Club Selected
              </Trans>
            </Heading>
            : <ClubPreview query={currentClubSelection[0].node} />}
          <Button onClick={onToggle} size='md' colorScheme={clubIsSelected ? 'gray' : 'teal'}>
            {clubIsSelected
              ? <Trans>
                Change
              </Trans>
              : <Trans>
                Select
              </Trans>}
          </Button>
        </Flex>
      </SmallBackgroundBox>
      <Collapse in={isOpen}>
        <RowWrap>
          {data.clubs.edges.map((item, index) => (
            <RowItem h='100%' key={index}>
              <Selector
                onSelect={onSelect}
                selected={(currentSelection != null) ? [currentSelection] : []}
                id={item.node.id}
              >
                <Flex
                  px={2}
                  py={2}
                >
                  <ClubPreview query={item.node} />
                </Flex>
              </Selector>
            </RowItem>
          )
          )}
          {hasNext &&
            <RowItem>
              <ClickableBox
                onClick={() => loadNext(3)}
                isLoading={isLoadingNext}
              >
                <Flex justify='center'>
                  <Text>
                    <Trans>
                      Load more clubs
                    </Trans>
                  </Text>
                </Flex>
              </ClickableBox>
            </RowItem>}
        </RowWrap>
      </Collapse>
    </Stack>
  )
}
