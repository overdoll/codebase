import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { useFlash } from '@//:modules/flash'
import {
  HStack,
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
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import PostSearchButton
  from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import PageFixedHeader from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/PageFixedHeader'
import FixedHeaderWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import LockedAccountTrigger from '../LockedAccount/LockedAccountTrigger/LockedAccountTrigger'
import { useRouter } from 'next/router'

interface Props {
  query: PreloadedQuery<HomeQuery>
}

const Query = graphql`
  query HomeQuery @preloadable {
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

  const router = useRouter()

  const hasNewAccount = read('new.account')

  useEffect(() => {
    if (hasNewAccount != null) {
      onOpen()
      flush('confirmation.error')
    }
  }, [hasNewAccount])

  return (
    <>
      <PageFixedHeader>
        <FixedHeaderWrapper>
          <HStack spacing={2} justify='flex-end'>
            <LockedAccountTrigger />
            <PostSearchButton routeTo='/search' />
          </HStack>
        </FixedHeaderWrapper>
      </PageFixedHeader>
      <GlobalVideoManagerProvider>
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
            <LinkButton
              size='lg'
              colorScheme='primary'
              href='/settings/preferences/curation-profile'
            >
              <Trans>
                Set up profile
              </Trans>
            </LinkButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
