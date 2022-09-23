import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import Head from 'next/head'
import { OverdollLogo } from '@//:assets/logos'
import ContactButton from '../../../common/components/Contact/ContactButton'

const ServerError = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>
          Temporary Server Issues - overdoll
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          <Icon
            icon={OverdollLogo}
            w={32}
            h={32}
            fill='primary.400'
          />
          <Box>
            <Heading
              fontSize='xl'
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
              color='gray.100'
            >
              <Trans>
                It looks like we're experiencing some server issues. Our best people are on it and we should be back
                shortly!
              </Trans>
            </Text>
          </Box>
          <Stack align='center' spacing={2}>
            <Text
              fontSize='sm'
              textAlign='center'
              color='gray.200'
            >
              <Trans>
                If you continue to experience issues for an extended period of time, please contact us
              </Trans>
            </Text>
            <ContactButton />
          </Stack>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default ServerError
