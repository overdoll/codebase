import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import ImageError from './ImageError/ImageError'

interface Props extends ImageProps {
}

export default function NextImage (props: Props): JSX.Element {
  const [error, setError] = useState(false)

  if (error) {
    return <ImageError />
  }

  return (
    <Image
      quality={100}
      placeholder='blur'
      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABJlBMVEVAT108R1Q3Pkk0O0g0QFIxP1chLUcPFSgEAwgBAAI+R1c7RVYwPVIsOVEjL0gZIz0RGDAGCBADAgQODQ6Om7F5eXosMkUUHTgpNE8eJToIChMxLipfW1els8l8f4U3PlE6RV9ugp5VY3oZHSUAAABMR0Fva2ifrcVPVWNwfJJgbYJOXXR1iqg8SlwMDhRQTEhuamaZp79NVGSLmrNicYpUZ36EnbxZbohMXnVwfo5tcnuaqMFOVWSFk6lqeIxUY3aFnLppfpZdcYlwhZ9whJ48Pkl7h5xfbYZHU2mKoLxoe5VZaX9pfJVvgpuYpr45O0d1gplTX3U8Q1SNob5oeJBOXXdhc41vgZs6PEhwf5ZVX3FCSFeInrtsd4tGT2BcbIJwgpz///8UKMNzAAAAAWJLR0RhsrBMhgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+YGAREMIcYNVu8AAAB2SURBVAjXY2BgZGJmYWVj5+Bk4OLm4eXjFxAUEmYQERUTl5CU4pSWYZCVk1dQVFJWUVVjUNfQ1NLW0dXTN2AwNDI2MTUzt7C0YrC2sbWzd3B0cnZhMHR1c/fw9PL28WXw8w8IDAoOCQ0LZ/CLiIyKjomNi08AAKyrErn/lpZyAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA2LTAxVDE3OjEyOjI5KzAwOjAw48KfjQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wNi0wMVQxNzoxMjoyOSswMDowMJKfJzEAAAAASUVORK5CYII='
      onError={() => setError(true)}
      {...props}
    />
  )
}
