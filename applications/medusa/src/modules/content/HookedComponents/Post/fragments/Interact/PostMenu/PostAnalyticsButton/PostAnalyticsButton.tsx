import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostAnalyticsButtonFragment$key } from '@//:artifacts/PostAnalyticsButtonFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { MenuItem } from '../../../../../../ThemeComponents/Menu/Menu'
import { EditView, HeartFull, RisingGraph } from '@//:assets/icons'
import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import CloseButton from '../../../../../../ThemeComponents/CloseButton/CloseButton'
import GridPaginationPostContent
  from '../../../../components/PaginationScroller/GridPaginationScroller/GridPaginationPost/GridPaginationPostContent/GridPaginationPostContent'
import React from 'react'
import StatisticHeader from '@//:common/components/StatisticHeader/StatisticHeader'

interface Props {
  query: PostAnalyticsButtonFragment$key
}

const Fragment = graphql`
  fragment PostAnalyticsButtonFragment on Post {
    likes
    views
    content {
      ...GridPaginationPostContentFragment
    }
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
          <ModalBody p={4}>
            <Stack spacing={8}>
              <Box borderRadius='md' w={200} h={200}>
                <GridPaginationPostContent isSmall={false} postContentQuery={data.content[0]} />
              </Box>
              {data.views === 0 && data.likes === 0
                ? (
                  <Heading fontSize='md' color='gray.200'>
                    <Trans>
                      We don't have enough data about this post yet
                    </Trans>
                  </Heading>
                  )
                : (
                  <Stack spacing={4}>
                    <StatisticHeader
                      icon={EditView}
                      title={(
                        <Trans>
                          Views
                        </Trans>)}
                    >
                      {data.views.toLocaleString()}
                    </StatisticHeader>
                    <StatisticHeader
                      icon={HeartFull}
                      title={(
                        <Trans>
                          Likes
                        </Trans>)}
                    >
                      {data.likes.toLocaleString()}
                    </StatisticHeader>
                  </Stack>
                  )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}
