import { graphql, useFragment } from 'react-relay/hooks'
import type { MediaPreviewModalFragment$key } from '@//:artifacts/MediaPreviewModalFragment.graphql'
import { Flex, Modal, ModalBody, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react'
import { RawCinematicMedia } from '@//:modules/content/HookedComponents/Media'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'

interface Props extends Omit<ModalProps, 'children'> {
  query: MediaPreviewModalFragment$key
}

const Fragment = graphql`
  fragment MediaPreviewModalFragment on PostContent {
    media {
      ...RawCinematicMediaFragment
    }
  }
`

export default function MediaPreviewModal ({
  query,
  onClose,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Modal
      allowPinchZoom
      isCentered
      size='full'
      preserveScrollBarGap
      autoFocus={false}
      onClose={onClose}
      {...rest}
    >
      <ModalOverlay
        bg='dimmers.400'
      />
      <ModalContent m={0} width='auto' boxShadow='none' bg='transparent'>
        <ModalBody w='100vw' p={0}>
          <Flex
            p={{
              base: 0,
              md: 1
            }}
            h='100vh'
            w='100%'
            align='center'
            justify='center'
            position='relative'
          >
            <RawCinematicMedia
              mediaQuery={data.media}
              observerProps={{
                isActive: true
              }}
            />
            <Flex w='100%' maxW='container.sm' position='absolute' top={2} right={2}>
              <CloseButton colorScheme='teal' size='lg' variant='solid' onClick={onClose} />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
