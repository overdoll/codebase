import { PageWrapper } from '@//:modules/content/PageLayout'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { ExternalLink } from '@//:modules/routing'
import { Center, Heading, Stack, Text } from '@chakra-ui/react'

const InviteOnly: PageProps<{}> = () => {
  return (
    <>
      <Head>
        <title>
          overdoll is invite-only for artists :: overdoll
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          <Heading>
            invite only
          </Heading>
          <Center>
            <ExternalLink
              href='https://docs.google.com/forms/d/e/1FAIpQLSf21AW0Sgn_VF3yaXsD0IYCbq8miRU8oqtVBPSC-7djiPaRgA/viewform'
            >
              <Button size='xl' colorScheme='primary'>
                <Trans>
                  Open Application Link
                </Trans>
              </Button>
            </ExternalLink>
          </Center>
          <Text fontSize='md' color='gray.200'>
            <Trans>
              For any other questions, you may contact hello@overdoll.com
            </Trans>
          </Text>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default InviteOnly
