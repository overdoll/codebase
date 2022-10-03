import { Flex, Heading, Stack } from '@chakra-ui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import Button from '@//:modules/form/Button/Button'
import { ConfirmVerifyTokenRevokeMutation } from '@//:artifacts/ConfirmVerifyTokenRevokeMutation.graphql'
import { ConfirmVerifyTokenFragment$key } from '@//:artifacts/ConfirmVerifyTokenFragment.graphql'
import { Trans } from '@lingui/macro'
import UAParser from 'ua-parser-js'
import Head from 'next/head'
import { Icon } from '@//:modules/content/PageLayout'
import { SuccessBox, WarningBox } from '@//:assets/icons'
import { useState } from 'react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: ConfirmVerifyTokenFragment$key
  onVerifyToken: () => void
  isVerifyingToken: boolean
}

const RevokeMutation = graphql`
  mutation ConfirmVerifyTokenRevokeMutation($input: RevokeAuthenticationTokenInput!) {
    revokeAuthenticationToken(input: $input) {
      revokedAuthenticationTokenId
    }
  }
`

const Fragment = graphql`
  fragment ConfirmVerifyTokenFragment on AuthenticationToken {
    userAgent
    location {
      city
      subdivision
      country
    }
  }
`

export default function ConfirmVerifyToken (props: Props): JSX.Element {
  const {
    query,
    onVerifyToken,
    isVerifyingToken
  } = props

  const data = useFragment(Fragment, query)

  const [revokeToken, isRevokingToken] = useMutation<ConfirmVerifyTokenRevokeMutation>(
    RevokeMutation
  )

  const [queryToken] = useQueryParam<string>('token')
  const [querySecret] = useQueryParam<string>('secret')

  const [hasRevoked, setHasRevoked] = useState(false)

  const cookieText = UAParser(
    data.userAgent
  )

  const onRevokeToken = (): void => {
    revokeToken({
      variables: {
        input: {
          token: queryToken,
          secret: querySecret
        }
      },
      updater: (store, payload) => {
        if (payload?.revokeAuthenticationToken?.revokedAuthenticationTokenId != null) {
          store.get(payload?.revokeAuthenticationToken?.revokedAuthenticationTokenId)?.invalidateRecord()
        }
      },
      onCompleted: () => {
        setHasRevoked(true)
      }
    })
  }

  if (hasRevoked) {
    return (
      <>
        <Head>
          <title>Revoked login - overdoll</title>
        </Head>
        <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
          <Stack spacing={4}>
            <Icon
              icon={SuccessBox}
              w={16}
              h={16}
              fill='gray.00'
            />
            <Heading fontSize='4xl' color='gray.00'>
              <Trans>
                Thanks. You prevented this device from logging in.
              </Trans>
            </Heading>
          </Stack>
          <Flex
            justify='center'
            align='center'
            wordBreak='break-all'
            p={3}
            borderRadius='lg'
            bg='gray.800'
            w='100%'
          >
            <Heading
              noOfLines={2}
              textAlign='center'
              fontSize='xl'
              color='primary.400'
            >
              {cookieText.browser.name} on {cookieText.os.name}
            </Heading>
            <Heading
              noOfLines={2}
              textAlign='center'
              fontSize='xl'
              color='primary.400'
            >
              {data.location.city}, {data.location.subdivision} ({data.location.country})
            </Heading>
          </Flex>
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

  return (
    <>
      <Head>
        <title>Confirm your login - overdoll</title>
      </Head>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        <Stack spacing={4}>
          <Icon
            icon={WarningBox}
            w={16}
            h={16}
            fill='gray.00'
          />
          <Heading fontSize='4xl' color='gray.00'>
            <Trans>
              Confirm that it's really you trying to join.
            </Trans>
          </Heading>
        </Stack>
        <Flex
          justify='center'
          align='center'
          wordBreak='break-all'
          p={3}
          borderRadius='lg'
          bg='gray.800'
          w='100%'
        >
          <Heading
            noOfLines={2}
            textAlign='center'
            fontSize='xl'
            color='primary.400'
          >
            {cookieText.browser.name} on {cookieText.os.name}
          </Heading>
          <Heading
            noOfLines={2}
            textAlign='center'
            fontSize='xl'
            color='primary.400'
          >
            {data.location.city}, {data.location.subdivision} ({data.location.country})
          </Heading>
        </Flex>
        <Stack spacing={4} align='center'>
          <Button
            w='100%'
            size='lg'
            colorScheme='primary'
            variant='solid'
            isDisabled={isRevokingToken}
            isLoading={isVerifyingToken}
            onClick={onVerifyToken}
          >
            <Trans>
              Yes, this is me
            </Trans>
          </Button>
          <Button
            size='md'
            variant='solid'
            colorScheme='gray'
            isDisabled={isVerifyingToken}
            isLoading={isRevokingToken}
            onClick={onRevokeToken}
          >
            <Trans>
              No, this is not me
            </Trans>
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
