import { RefetchFnDynamic } from 'react-relay/relay-hooks/useRefetchableFragmentNode'
import { FilterPublicClubPostsFragment$key } from '@//:artifacts/FilterPublicClubPostsFragment.graphql'
import { graphql } from 'react-relay/hooks'
import {
  Box,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import SelectPostsFilter from './SelectPostsFilter/SelectPostsFilter'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import { Icon } from '@//:modules/content/PageLayout'
import { MagicBall } from '@//:assets/icons'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { usePaginationFragment } from 'react-relay'
import { ResultPublicClubPostsQuery } from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'

export type FilterPostsRefetch = ((variables: Record<string, any>) => void) | RefetchFnDynamic<any, any>

interface Props {
  loadQuery: FilterPostsRefetch
  query: FilterPublicClubPostsFragment$key
  currentFilters: Record<string, any>
}

const Fragment = graphql`
  fragment FilterPublicClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 11}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPublicPostsTagsPaginationQuery" ) {
    id
    tags(first: $first, after: $after) @connection (key: "ClubPublicPosts_tags") {
      edges  {
        node  {
          __typename
          ...on Category {
            id
          }
          ...on Character {
            id
          }
          ...on Series {
            id
          }
          ...SelectPostsFilterFragment
        }
      }
    }
  }
`

export default function FilterPublicClubPosts (props: Props): JSX.Element {
  const {
    loadQuery,
    query,
    currentFilters
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultPublicClubPostsQuery, any>(
    Fragment,
    query
  )

  const limitTags = data.tags.edges.slice(0, 11)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const onLoadQuery = (params): void => {
    onClose()
    loadQuery(params)
  }

  return (
    <>
      <Wrap overflow='visible' align='center' spacing={1}>
        {limitTags.map((item) => (
          <WrapItem key={`${data.id as string}_${item.node.__typename as string}_${item.node.id as string ?? 0}`}>
            <SelectPostsFilter
              currentFilters={currentFilters}
              loadQuery={onLoadQuery}
              query={item.node}
            />
          </WrapItem>
        ))}
        {data.tags.edges.length > limitTags.length && (
          <WrapItem>
            <ClickableTile onClick={onOpen}>
              <Box
                maxW={400}
                borderRadius='lg'
                px={{
                  base: 2,
                  md: 3
                }}
                py={{
                  base: 1,
                  md: 2
                }}
                bg='gray.00'
              >
                <HStack spacing={2}>
                  <Icon
                    icon={MagicBall}
                    w={3}
                    h={3}
                    fill='gray.900'
                  />
                  <Heading
                    noOfLines={2}
                    fontSize={{
                      base: 'sm',
                      md: 'lg'
                    }}
                    color='gray.900'
                  >
                    All tags
                  </Heading>
                </HStack>
              </Box>
            </ClickableTile>
          </WrapItem>
        )}
      </Wrap>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody p={4}>
            <Stack>
              <Wrap pt={12} overflow='visible' align='center' spacing={1}>
                {data.tags.edges.map((item) => (
                  <WrapItem
                    key={`${data.id as string}_${item.node.__typename as string}_${item.node.id as string ?? 0}`}
                  >
                    <SelectPostsFilter
                      currentFilters={currentFilters}
                      loadQuery={onLoadQuery}
                      query={item.node}
                    />
                  </WrapItem>
                ))}
              </Wrap>
              {hasNext && (
                <Button isLoading={isLoadingNext} w='100%' size='md' onClick={() => loadNext(15)}>
                  <Trans>
                    Load more tags
                  </Trans>
                </Button>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
