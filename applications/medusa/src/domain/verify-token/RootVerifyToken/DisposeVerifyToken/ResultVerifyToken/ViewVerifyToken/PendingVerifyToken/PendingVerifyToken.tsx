import { Heading, Spinner, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { PendingVerifyTokenFragment$key } from '@//:artifacts/PendingVerifyTokenFragment.graphql'
import Head from 'next/head'
import { useEffect } from 'react'
import { Trans } from '@lingui/macro'
import usePreventWindowUnload from '@//:modules/hooks/usePreventWindowUnload'

interface Props {
  query: PendingVerifyTokenFragment$key
  onVerifyToken: () => void
}

const Fragment = graphql`
  fragment PendingVerifyTokenFragment on AuthenticationToken {
    verified
    secure
  }
`

export default function PendingVerifyToken (props: Props): JSX.Element {
  const {
    query,
    onVerifyToken
  } = props

  const data = useFragment(Fragment, query)

  useEffect(() => {
    // secure and verified, auto-verify the token
    if (!data.verified && data.secure) {
      onVerifyToken()
    }
  }, [data])

  usePreventWindowUnload(true)

  return (
    <>
      <Head>
        <title>Verifying login - overdoll</title>
      </Head>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        <Spinner thickness='6px' color='gray.00' w={16} h={16} />
        <Heading fontSize='4xl' color='gray.00'>
          <Trans>
            We're confirming your login.
          </Trans>
        </Heading>
      </Stack>
    </>
  )
}
