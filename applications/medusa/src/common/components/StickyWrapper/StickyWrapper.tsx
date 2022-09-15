import { RefObject, useEffect, useRef, useState } from 'react'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '@//:modules/support/runIfFunction'

interface ChildrenCallable {
  isSticky: boolean
  ref: RefObject<any>
}

interface Props {
  children: MaybeRenderProp<ChildrenCallable>
}

export default function StickyWrapper (props: Props): JSX.Element {
  const { children } = props

  const [isSticky, setIsSticky] = useState(false)
  const ref = useRef<any>(null)

  useEffect(() => {
    if (ref.current == null) return

    const cachedRef = ref.current
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      {
        threshold: [1]
      }
    )

    observer.observe(cachedRef)

    return () => {
      observer.unobserve(cachedRef)
    }
  }, [])

  return (
    <>
      {runIfFunction(children, {
        isSticky,
        ref
      })}
    </>
  )
}
