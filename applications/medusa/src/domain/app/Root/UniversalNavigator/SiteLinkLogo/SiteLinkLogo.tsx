import { Button } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { Trans } from '@lingui/macro'

export default function SiteLinkLogo (): JSX.Element {
  return (
    <Link href='/'>
      <Button
        textColor='primary.500'
        fontWeight='bold'
        fontFamily='heading'
        variant='link'
        colorScheme='primary'
      >
        <Trans>overdoll</Trans>
      </Button>
    </Link>
  )
}
