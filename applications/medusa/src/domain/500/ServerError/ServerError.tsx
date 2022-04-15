import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { BadgeCircle } from '@//:assets/icons/navigation'
import { Heading, Text } from '@chakra-ui/react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

const ServerError: PageProps<{}> = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>
          Temporary Server Issues :: overdoll
        </title>
      </Head>
      <PageWrapper>
        <Icon
          icon={BadgeCircle}
          fill='primary.500'
          w={100}
          h={100}
          ml='auto'
          mr='auto'
          mb={8}
        />
        <Heading
          fontSize='lg'
          textAlign='center'
          color='gray.00'
        >
          <Trans>
            We're currently experiencing server issues
          </Trans>
        </Heading>
        <Text
          fontSize='md'
          textAlign='center'
          color='gray.00'
        >
          <Trans>
            It looks like we're experiencing some server issues. Our best people are on it and we should be back
            shortly!
          </Trans>
        </Text>
      </PageWrapper>
    </>
  )
}

export default ServerError
