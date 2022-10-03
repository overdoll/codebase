import { Heading, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { WarningBox } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'

interface Props {
  onRetry: () => void
}

export default function ErrorVerifyToken (props: Props): JSX.Element {
  const {
    onRetry
  } = props

  return (
    <>
      <Head>
        <title>Error verifying - overdoll</title>
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
            We couldn't verify this login link.
          </Trans>
        </Heading>
      </Stack>
      <Button
        onClick={onRetry}
        size='xl'
        colorScheme='primary'
        variant='solid'
      >
        <Trans>
          Retry
        </Trans>
      </Button>
    </>
  )
}
