import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import Head from 'next/head'
import { SadError } from '@//:assets/icons'

export default function EmptyVerifyToken (): JSX.Element {
  return (
    <>
      <Head>
        <title>Invalid login link - overdoll</title>
      </Head>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        <Stack spacing={4}>
          <Icon
            icon={SadError}
            w={16}
            h={16}
            fill='gray.00'
          />
          <Heading fontSize='4xl' color='gray.00'>
            <Trans>
              This link is either invalid or has expired.
            </Trans>
          </Heading>
        </Stack>
        <LinkButton
          size='xl'
          colorScheme='primary'
          variant='solid'
          href='/join'
        >
          <Trans>
            Back
          </Trans>
        </LinkButton>
      </Stack>
    </>
  )
}
