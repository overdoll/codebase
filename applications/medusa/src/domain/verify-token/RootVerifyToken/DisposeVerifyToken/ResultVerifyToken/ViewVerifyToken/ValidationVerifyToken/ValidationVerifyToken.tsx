import { Heading, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { WarningBox } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

export default function ValidationVerifyToken (): JSX.Element {
  return (
    <>
      <Head>
        <title>Invalid login - overdoll</title>
      </Head>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        <Icon
          icon={WarningBox}
          w={16}
          h={16}
          fill='gray.00'
        />
        <Heading fontSize='4xl' color='gray.00'>
          <Trans>
            This login link is invalid.
          </Trans>
        </Heading>
        <LinkButton
          href='/'
          size='xl'
          colorScheme='primary'
          variant='solid'
        >
          <Trans>
            Home
          </Trans>
        </LinkButton>
      </Stack>
    </>
  )
}
