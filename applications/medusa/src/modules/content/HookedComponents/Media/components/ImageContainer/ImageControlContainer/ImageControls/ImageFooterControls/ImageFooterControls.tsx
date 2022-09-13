import { Fade, Flex } from '@chakra-ui/react'
import { ImageMediaCopy, SetCoveredProps } from '../../ImageControlContainer'
import { ImageControlsOpen } from '../ImageControls'
import ImageAdvancedControls from './ImageAdvancedControls/ImageAdvancedControls'
import { ColorType } from '../../../../../types'
import { ControlContainCoverImageProps } from '../../../ImageWrapper/ControlCoverContainImage/ControlCoverContainImage'

interface Props extends ImageMediaCopy, ImageControlsOpen, ColorType, SetCoveredProps, ControlContainCoverImageProps {
}

export default function ImageFooterControls (props: Props): JSX.Element {
  const {
    imageMedia,
    isOpen,
    rgb,
    setCovered,
    isCovered
  } = props

  return (
    <Flex
      p={2}
      align='flex-end'
      justify='flex-end'
      w='100%'
      h='100%'
    >
      <Fade
        in={isOpen}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        <ImageAdvancedControls isCovered={isCovered} setCovered={setCovered} rgb={rgb} imageMedia={imageMedia} />
      </Fade>
    </Flex>
  )
}
