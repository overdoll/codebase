import { ImageMediaProps } from '../../components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'
import ImageBackgroundContainer from '../../components/ImageContainer/ImageBackgroundContainer/ImageBackgroundContainer'

interface Props extends ImageMediaProps {
}

export default function StaticImageCover (props: Props): JSX.Element {
  const {
    url,
    width,
    height,
    color
  } = props

  return (
    <ImageBackgroundContainer
      width={width}
      height={height}
      url={url}
      rgb={color}
    />
  )
}
