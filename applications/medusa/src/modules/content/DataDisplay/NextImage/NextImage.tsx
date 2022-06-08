import Image, { ImageProps } from 'next/image'

interface Props extends ImageProps {
}

export default function NextImage (props: Props): JSX.Element {
  return (
    <Image
      unoptimized
      {...props}
    />

  )
}
