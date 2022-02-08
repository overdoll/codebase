import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll from '../../../components/PostsInfiniteScroll/PostsInfiniteScroll'
import FloatingGeneralSearchButton from '../../../components/FloatingGeneralSearchButton/FloatingGeneralSearchButton'
import { useFlash } from '@//:modules/flash'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { Trans } from '@lingui/macro'
import { Link } from '@//:modules/routing'
import Button from '@//:modules/form/Button/Button'
import CloseButton from '@//:modules/form/CloseButton/CloseButton'

interface Props {
  query: PreloadedQuery<HomeQuery>
}

const Query = graphql`
  query HomeQuery {
    ...HomeFragment
    viewer {
      ...PostsInfiniteScrollViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment HomeFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "HomePostsPaginationQuery" ) {
    posts (first: $first, after: $after, sortBy: TOP)
    @connection (key: "HomePosts_posts") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

export default function Home (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<HomeQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<HomeQuery, any>(
    Fragment,
    queryData
  )

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const {
    read,
    flush
  } = useFlash()

  const hasNewAccount = read('new.account')

  useEffect(() => {
    if (hasNewAccount != null) {
      onOpen()
      flush('confirmation.error')
    }
  }, [hasNewAccount])

  return (
    <>
      <GlobalVideoManagerProvider>
        <FloatingGeneralSearchButton
          routeTo='/search'
        />
        <PostsInfiniteScroll
          hasNext={hasNext}
          isLoadingNext={isLoadingNext}
          loadNext={loadNext}
          query={data.posts}
          viewerQuery={queryData.viewer}
        />
      </GlobalVideoManagerProvider>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='none'
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalHeader>
            <Trans>
              Set Up Your Profile
            </Trans>
          </ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <Text color='gray.00' fontSize='md'>
                <Trans>
                  Welcome to overdoll! We're so glad to have you here. On our platform, we strive to make sure you're
                  served content you want to see. Take a few minutes to set up your curation profile to let us know what
                  you like?
                </Trans>
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Link to='/configure/curation-profile'>
              <Button size='lg' colorScheme='orange'>
                <Trans>
                  Set up profile
                </Trans>
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
