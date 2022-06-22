import { graphql, useFragment } from 'react-relay/hooks'
import type { PayoutCountryNotSupportedFragment$key } from '@//:artifacts/PayoutCountryNotSupportedFragment.graphql'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { WarningTriangle } from '@//:assets/icons'
import HighlightInline from '@//:modules/content/ContentHints/HighlightInline/HighlightInline'

interface Props {
  query: PayoutCountryNotSupportedFragment$key
}

const Fragment = graphql`
  fragment PayoutCountryNotSupportedFragment on Country {
    name
  }
`

export default function PayoutCountryNotSupported ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack align='center' spacing={4}>
      <Icon icon={WarningTriangle} fill='orange.300' w={12} h={12} />
      <Stack spacing={2}>
        <Heading textAlign='center' fontSize='2xl' color='gray.00'>
          <Trans>
            Country Not Supported
          </Trans>
        </Heading>
        <Text textAlign='center' fontSize='md' color='gray.100'>
          <Trans>
            Unfortunately, we cannot currently pay out to artists located in the country{' '}
            <HighlightInline
              color='orange.300'
            >{data.name}
            </HighlightInline>.
            This could be because of currently active sanctions or our providers not being able to support it.
          </Trans>
        </Text>
      </Stack>
    </Stack>
  )
}
