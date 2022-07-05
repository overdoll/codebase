import Image, { ImageProps } from 'next/future/image'
import { forwardRef } from 'react'

interface Props extends ImageProps {
}

const NextImage = forwardRef<any, Props>((props: Props, forwardRef): JSX.Element => {
  return (
    <Image
      {...props}
    />
  )
})

export default NextImage
