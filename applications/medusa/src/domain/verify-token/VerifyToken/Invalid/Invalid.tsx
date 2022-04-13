import { Flex } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import Head from 'next/head'

export default function Invalid (): JSX.Element {
  return (
    <>
      <Head>
        <title>Invalid Authentication :: overdoll</title>
      </Head>
      <PageWrapper>
        <Alert
          mb={4}
          status='warning'
        >
          <AlertIcon />
          <AlertDescription>
            <Trans>
              The login link you are using is either invalid or expired
            </Trans>
          </AlertDescription>
        </Alert>
        <Flex justify='center'>
          <LinkButton
            size='lg'
            colorScheme='gray'
            variant='solid'
            to='/join'
          >
            <Trans>
              Back to the Join page
            </Trans>
          </LinkButton>
        </Flex>
      </PageWrapper>
    </>
  )
}
