/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense } from 'react'
import JSResource from './JSResource'
import CanUseDOM from '@//:modules/utilities/CanUseDOM'
import { Image, Img } from '@chakra-ui/react'

type Props = {
  src: string,
  fallback: Node
};

function SuspenseImage (props: Props): Node {
  const { fallback, src, ...rest } = props

  // if SRC is undefined or null, we will just show a fallback
  if (typeof src !== 'string') {
    return fallback
  }

  // On the server, we use a regular img
  if (!CanUseDOM) {
    return <Img src={src} {...rest} />
  }

  // JSResource is meant for loading resources, but the implementation is
  // just cached loading of promises. So we reuse that here as a quick
  // way to suspend while images are loading, with caching in case
  // we encouter the same image twice (in that case, we'll create
  // new loader *functions*, but JSResource will return a cached
  // value and only load the image once.
  const resource = JSResource(src, () => {
    return new Promise(resolve => {
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

  resource.load()
  // TODO commenting this out stops the infinite loop so i did it
  // resource.read() // suspends while the image is pending

  return <Image src={src} ignoreFallback {...rest} />
}

export default function SuspenseImageWrapper (props: Props): Node {
  return (
    <Suspense fallback={props.fallback}>
      <SuspenseImage {...props} />
    </Suspense>
  )
}
