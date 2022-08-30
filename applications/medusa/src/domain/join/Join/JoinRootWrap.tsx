import { PreloadedQuery } from 'react-relay/hooks'
import type { JoinRootQuery } from '@//:artifacts/JoinRootQuery.graphql'
import { PageProps } from '@//:types/app'
import BackgroundPatternWrapper from './components/BackgroundPatternWrapper/BackgroundPatternWrapper'
import PageWrapperDesktop from '../../../common/components/PageWrapperDesktop/PageWrapperDesktop'
import PlatformBenefitsAdvert from './components/PlatformBenefitsAdvert/PlatformBenefitsAdvert'
import JoinRichObject from '../../../common/rich-objects/join/JoinRichObject/JoinRichObject'
import JoinRoot from './JoinRoot'

interface Props {
  queryRefs: {
    joinQuery: PreloadedQuery<JoinRootQuery>
  }
}

const JoinRootWrap: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { joinQuery } } = props

  return (
    <>
      <JoinRichObject />
      <BackgroundPatternWrapper>
        <PageWrapperDesktop>
          <PlatformBenefitsAdvert>
            <JoinRoot query={joinQuery} />
          </PlatformBenefitsAdvert>
        </PageWrapperDesktop>
      </BackgroundPatternWrapper>
    </>
  )
}

export default JoinRootWrap
