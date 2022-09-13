import { HStack } from '@chakra-ui/react'
import { CONTROLS_CONTAINER } from '../../../../../../constants'
import { ImageMediaCopy, SetCoveredProps } from '../../../ImageControlContainer'
import ImageExpandModal from '../Controls/ImageExpandModal/ImageExpandModal'
import { ColorType } from '../../../../../../types'
import ImageExpandCover from '../Controls/ImageExpandCover/ImageExpandCover'

interface Props extends ImageMediaCopy, ColorType, SetCoveredProps {

}

export default function ImageAdvancedControls (props: Props): JSX.Element {
  const {
    imageMedia,
    rgb,
    setCovered
  } = props

  return (
    <HStack
      {...CONTROLS_CONTAINER}
      data-ignore='click'
      h={12}
      px={4}
      align='center'
      justify='center'
      spacing={4}
    >
      <ImageExpandCover setCovered={setCovered} />
      <ImageExpandModal rgb={rgb} imageMedia={imageMedia} />
    </HStack>
  )
}
