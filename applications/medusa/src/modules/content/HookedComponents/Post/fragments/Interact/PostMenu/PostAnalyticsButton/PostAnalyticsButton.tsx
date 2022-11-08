import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostAnalyticsButtonFragment$key } from '@//:artifacts/PostAnalyticsButtonFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { MenuItem } from '../../../../../../ThemeComponents/Menu/Menu'
import { RisingGraph } from '@//:assets/icons'
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
  useDisclosure
} from '@chakra-ui/react'
import CloseButton from '../../../../../../ThemeComponents/CloseButton/CloseButton'
import GridPaginationPost
  from '../../../../components/PaginationScroller/GridPaginationScroller/GridPaginationPost/GridPaginationPost'

interface Props {
  query: PostAnalyticsButtonFragment$key
}

const Fragment = graphql`
  fragment PostAnalyticsButtonFragment on Post {
    likes
    views
    ...GridPaginationPostFragment
  }
`

export default function PostAnalyticsButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  return (
    <>
      <MenuItem
        onClick={onOpen}
        text={(
          <Trans>
            Analytics
          </Trans>)}
        icon={RisingGraph}
      />
      <Modal
        isCentered
        size={{
          base: 'sm',
          md: 'lg'
        }}
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody p={3}>
            <Stack spacing={8}>
              <Box w={200} h={200}>
                <GridPaginationPost query={data} />
              </Box>
              <HStack spacing={4}>
                <Stack spacing={1}>
                  <Heading fontSize='sm' color='gray.200'>
                    <Trans>
                      Views
                    </Trans>
                  </Heading>
                  <Heading fontSize='xl' color='gray.00'>
                    <Trans>
                      {data.views}
                    </Trans>
                  </Heading>
                </Stack>
                <Stack spacing={1}>
                  <Heading fontSize='sm' color='gray.200'>
                    <Trans>
                      Likes
                    </Trans>
                  </Heading>
                  <Heading fontSize='xl' color='gray.00'>
                    <Trans>
                      {data.likes}
                    </Trans>
                  </Heading>
                </Stack>
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}
