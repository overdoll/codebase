import { ControlFullscreenEnable } from '@//:assets/icons'
import MediaButton from '../../../../../../MediaControls/MediaButton/MediaButton'
import { ImageMediaCopy } from '../../../../ImageControlContainer'
import {
  Fade,
  Flex,
  Heading,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useTimeout
} from '@chakra-ui/react'
import FillImage from '../../../../../ImageWrapper/FillImage/FillImage'
import { ColorType } from '../../../../../../../types'
import { CONTROLS_CONTAINER } from '../../../../../../../constants'
import { Trans } from '@lingui/macro'
import { useState } from 'react'
import { useUpdateEffect } from 'usehooks-ts'

interface Props extends ImageMediaCopy, ColorType {

}

export default function ImageExpandModal (props: Props): JSX.Element {
  const {
    imageMedia,
    rgb
  } = props

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const [showPopup, setShowPopup] = useState(false)
  const [delay, setDelay] = useState<number | null>(null)

  const bgColor = typeof rgb === 'string' ? rgb : (rgb != null ? `rgba(${rgb.red},${rgb?.green},${rgb?.blue},0.7)` : undefined)

  useTimeout(() => setShowPopup(false), delay)

  useUpdateEffect(() => {
    if (isOpen) {
      setShowPopup(true)
      setDelay(3000)
      return
    }
    setDelay(null)
  }, [isOpen])

  return (
    <>
      <MediaButton
        onClick={onOpen}
        icon={ControlFullscreenEnable}
      />
      <Modal
        allowPinchZoom
        isCentered
        size='full'
        preserveScrollBarGap
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay
          bg={bgColor ?? 'dimmers.400'}
        />
        <ModalContent onClick={onClose} m={0} width='auto' boxShadow='none' bg='transparent'>
          <ModalBody w='100vw' p={0}>
            <Flex
              h='100vh'
              w='100%'
              align='center'
              justify='center'
              position='relative'
            >
              <Flex pointerEvents='none' top={2} w='100%' align='center' justify='center' position='absolute'>
                <Fade in={showPopup}>
                  <Flex
                    {...CONTROLS_CONTAINER}
                    h={10}
                    px={4}
                    align='center'
                    justify='center'
                  >
                    <Heading fontSize='lg' color='whiteAlpha.900'>
                      <Trans>
                        Tap anywhere or hit <Kbd borderColor='whiteAlpha.900'>ESC</Kbd> to close
                      </Trans>
                    </Heading>
                  </Flex>
                </Fade>
              </Flex>
              <FillImage>
                {imageMedia}
              </FillImage>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
