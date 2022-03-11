import { Trans } from '@lingui/macro'
import { Link, Text } from '@chakra-ui/react'

export default function SupporterGuidelinesAgreement (): JSX.Element {
  return (
    <Text fontSize='md' color='gray.00'>
      <Trans>
        I have read and agree to the <Link
          color='teal.400'
          fontSize='md'
          isExternal
          href='https://www.corpodoll.com/supporter-guidelines/'
                                     >
          Supporter Guidelines
                                     </Link>
        , which clearly outline the refund and cancellation policy.
      </Trans>
    </Text>
  )
}
