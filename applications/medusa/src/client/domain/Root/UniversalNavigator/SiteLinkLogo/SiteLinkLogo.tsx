import { Button } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { Trans } from '@lingui/macro'

interface Props {
  invisible?: boolean
}

export default function SiteLinkLogo ({ invisible = false }: Props): JSX.Element {
  return (
    <Link to='/'>
      {invisible
        ? (<Trans>od</Trans>)
        : (
          <Button
            textColor='primary.500'
            fontWeight='bold'
            fontFamily='heading'
            variant='link'
            colorScheme='primary'
            width='100%'
          >
            <Trans>od</Trans>
          </Button>)}
    </Link>
  )
}
