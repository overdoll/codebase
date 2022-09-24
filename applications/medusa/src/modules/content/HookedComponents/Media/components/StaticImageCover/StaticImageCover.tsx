import { ImageMediaProps } from '../ImageContainer/ImageWrapper/ImageMedia/ImageMedia'
import ImageBackgroundContainer from '../ImageContainer/ImageBackgroundContainer/ImageBackgroundContainer'

interface Props extends ImageMediaProps {
}

export default function StaticImageCover (props: Props): JSX.Element {
  const {
    url,
    width,
    height,
    color,
    ...rest
  } = props

  return (
    <ImageBackgroundContainer
      width={width}
      height={height}
      url={url}
      rgb={color}
      {...rest}
    />
  )
}
