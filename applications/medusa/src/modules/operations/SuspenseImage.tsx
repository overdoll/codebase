import { Suspense } from 'react'
import { Resource } from './JSResource'
import CanUseDOM from './CanUseDOM'
import { Image, ImageProps, Img } from '@chakra-ui/react'

interface Props extends ImageProps {
  src?: string
  fallback: JSX.Element
}

function SuspenseImageWrap (props: Props): JSX.Element {
  const {
    fallback,
    src,
    ...rest
  } = props

  // if SRC is undefined or null, we will just show a fallback
  if (typeof src !== 'string') {
    return fallback
  }

  // On the server, we use a regular img
  if (!CanUseDOM) {
    return (
      <Img
        src={src}
        {...rest}
      />
    )
  }

  // JSResource is meant for loading resources, but the implementation is
  // just cached loading of promises. So we reuse that here as a quick
  // way to suspend while images are loading, with caching in case
  // we encouter the same image twice (in that case, we'll create
  // new loader *functions*, but JSResource will return a cached
  // value and only load the image once.
  const resource = Resource(src, async () => {
    return await new Promise(resolve => {
      const img = new window.Image()
      img.onload = () => {
        resolve(src)
      }
      img.onerror = () => {
        resolve(src)
      }
      img.src = src
    })
  })

  void resource.load()
  // TODO commenting this out stops the infinite loop so i did it
  // resource.read() // suspends while the image is pending

  return (
    <Image
      src={src}
      ignoreFallback
      {...rest}
    />
  )
}

export default function SuspenseImage (props: Props): JSX.Element {
  return (
    <Suspense fallback={props.fallback}>
      <SuspenseImageWrap {...props} />
    </Suspense>
  )
}
