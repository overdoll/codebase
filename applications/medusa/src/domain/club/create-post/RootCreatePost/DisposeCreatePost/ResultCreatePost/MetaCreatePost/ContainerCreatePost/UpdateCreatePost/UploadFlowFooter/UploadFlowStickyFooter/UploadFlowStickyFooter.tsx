import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UploadFlowStickyFooterFragment$key } from '@//:artifacts/UploadFlowStickyFooterFragment.graphql'
import { FlowBuilderFooter, MobileContainer } from '@//:modules/content/PageLayout'
import UploadFlowFooter from '../UploadFlowFooter'
import { Flex } from '@chakra-ui/react'

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

  const STICKY_PROPS = {
    bg: 'dimmers.200',
    p: 2,
    backdropFilter: 'auto',
    backdropBlur: '2px',
    zIndex: 'sidebar',
    borderTopRadius: 'lg'
  }

  return (
    <Flex
      bottom={{
        base: 66,
        md: 0
      }}
      position='fixed'
      w='100%'

    >
      <MobileContainer>
        <Flex {...STICKY_PROPS}>
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

      </MobileContainer>
    </Flex>
  )
}
