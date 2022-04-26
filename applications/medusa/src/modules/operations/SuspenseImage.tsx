import JSResource from './JSResource'
import { Image, ImageProps, Img } from '@chakra-ui/react'
import { useHydrate } from '../hydrate'
import { Suspense } from 'react'

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

  // JSResource is meant for loading resources, but the implementation is
  // just cached loading of promises. So we reuse that here as a quick
  // way to suspend while images are loading, with caching in case
  // we encouter the same image twice (in that case, we'll create
  // new loader *functions*, but JSResource will return a cached
  // value and only load the image once.

  const resource = JSResource(src, async () => {
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

  return (
    <Image
      src={src}
      ignoreFallback
      {...rest}
    />
  )
}

export default function SuspenseImage (props: Props): JSX.Element {
  const isHydrated = useHydrate()

  // On the server, we use a regular img
  if (!isHydrated) {
    return (
      <Img
        {...props}
      />
    )
  }

  return (
    <Suspense fallback={props.fallback}>
      <SuspenseImageWrap {...props} />
    </Suspense>
  )
}
