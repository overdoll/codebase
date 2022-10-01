import { Center, Flex, Heading, Spinner, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { CompleteFragment$key } from '@//:artifacts/CompleteFragment.graphql'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { CheckCircle } from '@//:assets/icons'
import UAParser from 'ua-parser-js'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BackgroundPatternWrapper from '../../../join/Join/components/BackgroundPatternWrapper/BackgroundPatternWrapper'
import PageWrapperDesktop from '../../../../common/components/PageWrapperDesktop/PageWrapperDesktop'
import AdvertBoxWrapper from '../../../join/Join/components/PlatformBenefitsAdvert/AdvertBoxWrapper/AdvertBoxWrapper'
import VerifyTokenRichObject
  from '../../RootVerifyToken/VerifyTokenRichObject/VerifyTokenRichObject'
import { useEffect } from 'react'

interface Props {
  query: CompleteFragment$key
}

const Fragment = graphql`
  fragment CompleteFragment on AuthenticationToken {
    userAgent
    sameDevice
    accountStatus {
      registered
    }
  }
`

export default function Complete ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <Head>
        <title>Verification Complete - overdoll</title>
      </Head>
      <VerifyTokenRichObject />
      <BackgroundPatternWrapper>
        <PageWrapperDesktop>
          <Center>
            <AdvertBoxWrapper>
              <></>
            </AdvertBoxWrapper>
          </Center>
        </PageWrapperDesktop>
      </BackgroundPatternWrapper>
    </>
  )
}
