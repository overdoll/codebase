/**
 * @flow
 */
import type { Node } from 'react'
import type { Content as ContentType } from '@//:types/upload'
import { useRef } from 'react'
import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import ImageSnippet from '../Snippets/ImageSnippet/ImageSnippet'
import InspectModal from '../../Posts/components/modal/InspectModal'
import Icon from '@//:modules/content/Icon/Icon'

import InterfaceArrowsShrinkVertical
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-vertical.svg'
import InterfaceArrowsVerticalExpand1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-vertical-expand-1.svg'
import VideoSnippet from '../Snippets/VideoSnippet/VideoSnippet'

type Props = {
  content: Array<ContentType>,
}

export default function ContentItem ({ content, ...rest }: Props): Node {
  const fileType = content.type

  const videoContent = useRef(null)

  const {
    isOpen: isPreviewOpen,
    onOpen: onPreviewOpen,
    onClose: onPreviewClose
  } = useDisclosure()

  const {
    isOpen: previewExpand,
    onToggle: setPreviewExpand
  } = useDisclosure()

  const onOpenModal = () => {
    onPreviewOpen()
    if (fileType === 'VIDEO' && videoContent.current) {
      videoContent.current.pause()
    }
  }

  return (
    <>
      <Flex
        position='relative'
        align='center'
        justify='center'
        userSelect='none'
        {...rest}
      >
        {fileType === 'IMAGE' &&
          <ImageSnippet urls={content.urls} />}
        {fileType === 'VIDEO' &&
          <VideoSnippet innerRef={videoContent} urls={content.urls} />}
        <Box
          bg='transparent'
          w='40%'
          h='50%'
          position='absolute'
          cursor='pointer'
          display={isPreviewOpen ? 'none' : 'block'}
          onClick={onOpenModal}
        />
      </Flex>
      <InspectModal
        supplement={
          <IconButton
            variant='ghost'
            w='40px'
            h='40px'
            m={2}
            onClick={setPreviewExpand}
            icon={
              <Icon
                icon={!previewExpand ? InterfaceArrowsVerticalExpand1 : InterfaceArrowsShrinkVertical}
                fill='gray.100'
                w={4}
                h={4}
              />
            }
          />
        } isOpen={isPreviewOpen} onClose={onPreviewClose}
      >
        {fileType === 'IMAGE' &&
          <ImageSnippet objectFit={previewExpand ? 'cover' : 'contain'} urls={content.urls} />}
        {fileType === 'VIDEO' &&
          <VideoSnippet
            autoPlay controls objectFit={previewExpand ? 'cover' : 'contain'} urls={content.urls}
          />}
      </InspectModal>
    </>
  )
}
