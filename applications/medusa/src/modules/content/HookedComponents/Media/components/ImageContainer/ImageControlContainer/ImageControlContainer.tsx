import { Flex } from '@chakra-ui/react'
import ImageMedia, { ImageMediaProps } from '../ImageWrapper/ImageMedia/ImageMedia'
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'
import ImageControls from './ImageControls/ImageControls'
import { ColorType } from '../../../types'
import ControlCoverContainImage from '../ImageWrapper/ControlCoverContainImage/ControlCoverContainImage'
import ImageBackground from './ImageBackground/ImageBackground'

export interface ImageMediaCopy {
  imageMedia: ReactNode
}

export interface SetCoveredProps {
  setCovered: Dispatch<SetStateAction<boolean>>
}

export interface ImageBackgroundProps {
  backgroundPoster: ReactNode
  hdPoster: ReactNode
}

interface Props extends Omit<ImageMediaProps, 'color'>, ColorType, Partial<ImageBackgroundProps> {
}

export default function ImageControlContainer (props: Props): JSX.Element {
  const {
    url,
    rgb,
    variants,
    backgroundPoster,
    hdPoster,
    loadFirst
  } = props

  const CloneImageMedia = useMemo(() => <ImageMedia loadFirst={loadFirst} url={url} variants={variants} />, [url])

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
    >
      {backgroundPoster != null && (
        <ImageBackground backgroundPoster={backgroundPoster} />
      )}
      <ControlCoverContainImage isCovered={isCovered}>
        {CloneImageMedia}
      </ControlCoverContainImage>
      <ImageControls setCovered={setCovered} rgb={rgb} imageMedia={hdPoster} />
    </Flex>
  )
}
