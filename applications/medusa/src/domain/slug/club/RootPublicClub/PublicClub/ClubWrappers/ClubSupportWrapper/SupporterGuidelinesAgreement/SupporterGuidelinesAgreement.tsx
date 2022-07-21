import { Trans } from '@lingui/macro'
import { Box, Link, Text } from '@chakra-ui/react'
import { SUPPORTER_GUIDELINES } from '@//:modules/constants/links'

export default function SupporterGuidelinesAgreement (): JSX.Element {
  return (
    <Box>
      <Text
        fontSize='md'
        color='gray.00'
      >
        <Trans>
          I have read and agree to the{' '}
          <Link
            color='teal.300'
            fontSize='inherit'
            isExternal
            href={SUPPORTER_GUIDELINES}
          >
            Supporter Guidelines
          </Link>
        </Trans>
      </Text>
    </Box>

  )
}
