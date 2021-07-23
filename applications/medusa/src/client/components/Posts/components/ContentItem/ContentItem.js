/**
 * @flow
 */
import type { Node } from 'react'
import { useRef } from 'react'
import mime from 'mime-types'
import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import ImageSnippet from './ImageSnippet/ImageSnippet'
import InspectModal from '../modal/InspectModal'
import Icon from '@//:modules/content/Icon/Icon'

import InterfaceArrowsShrinkVertical
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-vertical.svg'
import InterfaceArrowsVerticalExpand1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-vertical-expand-1.svg'
import VideoSnippet from './VideoSnippet/VideoSnippet'

type Props = {
  src: string,
}

export default function ContentItem ({ src, ...rest }: Props): Node {
  const mimeType = mime.lookup(src)

  const fileType = mimeType.split('/')[0]

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
    if (fileType === 'video' && videoContent.current) {
      videoContent.current.pause()
    }
  }

  return (
    <>
      <Flex
        h='100%'
        position='relative'
        align='center'
        justify='center'
        userSelect='none'
        {...rest}
      >
        {fileType === 'image' &&
          <ImageSnippet src={src} />}
        {fileType === 'video' &&
          <VideoSnippet innerRef={videoContent} src={src} type={mimeType} />}
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
        {fileType === 'image' &&
          <ImageSnippet objectFit={previewExpand ? 'cover' : 'contain'} src={src} />}
        {fileType === 'video' &&
          <VideoSnippet
            autoPlay objectFit={previewExpand ? 'cover' : 'contain'} src={src}
            type={mimeType}
          />}
      </InspectModal>
    </>
  )
}
