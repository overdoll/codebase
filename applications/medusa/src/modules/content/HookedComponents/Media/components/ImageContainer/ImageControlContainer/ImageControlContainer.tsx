import { Flex } from '@chakra-ui/react'
import ImageMedia, { ImageMediaProps } from '../ImageWrapper/ImageMedia/ImageMedia'
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'
import ImageControls from './ImageControls/ImageControls'
import { ColorType } from '../../../types'
import ControlCoverContainImage from '../ImageWrapper/ControlCoverContainImage/ControlCoverContainImage'

export interface ImageMediaCopy {
  imageMedia: ReactNode
}

export interface SetCoveredProps {
  setCovered: Dispatch<SetStateAction<boolean>>
}

interface Props extends Omit<ImageMediaProps, 'color'>, ColorType, SetCoveredProps {
}

export default function ImageControlContainer (props: Props): JSX.Element {
  const {
    url,
    rgb,
    variants
  } = props

  const bgColor = rgb != null ? `rgb(${rgb.red},${rgb.green},${rgb.blue})` : undefined

  const CloneImageMedia = useMemo(() => <ImageMedia url={url} variants={variants} />, [url])

  const [isCovered, setCovered] = useState(false)

  return (
    <Flex
      w='100%'
      h='100%'
      align='center'
      justify='center'
      position='relative'
      overflow='hidden'
      borderRadius='inherit'
      bg={bgColor ?? 'gray.800'}
    >
      <ControlCoverContainImage isCovered={isCovered}>
        {CloneImageMedia}
      </ControlCoverContainImage>
      <ImageControls setCovered={setCovered} rgb={rgb} imageMedia={CloneImageMedia} />
    </Flex>
  )
}
