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

  return (
    <Flex
      pt={4}
      bottom={{
        base: 54,
        md: 0
      }}
      left={0}
      right={0}
      position='sticky'
      zIndex='sidebar'
    >
      <MobileContainer>
        <Flex>
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
