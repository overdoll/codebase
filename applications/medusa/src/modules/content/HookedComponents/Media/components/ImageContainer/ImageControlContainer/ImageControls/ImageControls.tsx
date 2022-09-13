import { Flex, Grid, GridItem } from '@chakra-ui/react'
import useEnterControls from '../../../../support/useEnterControls'
import { useRef } from 'react'
import { ImageMediaCopy, SetCoveredProps } from '../ImageControlContainer'
import ImageFooterControls from './ImageFooterControls/ImageFooterControls'
import { ColorType } from '../../../../types'
import { ControlContainCoverImageProps } from '../../ImageWrapper/ControlCoverContainImage/ControlCoverContainImage'

export interface ImageControlsOpen {
  isOpen: boolean
}

interface Props extends ImageMediaCopy, ColorType, SetCoveredProps, ControlContainCoverImageProps {
}

export default function ImageControls (props: Props): JSX.Element {
  const {
    imageMedia,
    rgb,
    setCovered,
    isCovered
  } = props

  const ref = useRef(null)

  const {
    isOpen,
    showCursor
  } = useEnterControls({
    ref
  })

  return (
    <Flex
      ref={ref}
      w='100%'
      h='100%'
      top={0}
      right={0}
      left={0}
      cursor={showCursor === true ? 'auto' : 'none'}
      position='absolute'
      align='center'
      justify='center'
      userSelect='none'
    >
      <Grid
        w='100%'
        h='100%'
        templateAreas={`
      "header header header"
      "left center right"
      "footer footer footer"  
      `}
        templateRows='25% 50% 25%'
        templateColumns='25% 50% 25%'
      >
        {/* <GridItem area='header' /> */}
        {/* <GridItem area='center' /> */}
        <GridItem area='footer'>
          <ImageFooterControls isCovered={isCovered} setCovered={setCovered} rgb={rgb} imageMedia={imageMedia} isOpen={isOpen} />
        </GridItem>
      </Grid>
    </Flex>
  )
}
