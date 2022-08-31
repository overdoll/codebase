import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UploadFlowStickyFooterFragment$key } from '@//:artifacts/UploadFlowStickyFooterFragment.graphql'
import { FlowBuilderFooter } from '@//:modules/content/PageLayout'
import UploadFlowFooter from '../UploadFlowFooter'
import { Flex } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

interface Props {
  query: UploadFlowStickyFooterFragment$key
}

const Fragment = graphql`
  fragment UploadFlowStickyFooterFragment on Post {
    ...UploadFlowFooterFragment
  }
`

export default function UploadFlowStickyFooter ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [isSticky, setIsSticky] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const STICKY_PROPS = {
    bg: 'dimmers.300',
    pt: 2,
    borderRadius: 'lg',
    px: 2,
    backdropFilter: 'auto',
    backdropBlur: '2px',
    zIndex: 'sidebar'
  }

  const UNSTICKY_PROPS = {}

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
    <Flex
      ref={ref}
      bottom={{
        base: -1,
        md: -2
      }}
      pb={{
        base: 66,
        md: 4
      }}
      position='sticky'
      w='100%'
      {...isSticky ? STICKY_PROPS : UNSTICKY_PROPS}
    >
      <FlowBuilderFooter>
        {({
          currentStep,
          isAtStart,
          nextStep
        }) => (
          <UploadFlowFooter
            step={currentStep}
            isAtStart={isAtStart}
            nextStep={nextStep}
            query={data}
          />
        )}
      </FlowBuilderFooter>
    </Flex>
  )
}
