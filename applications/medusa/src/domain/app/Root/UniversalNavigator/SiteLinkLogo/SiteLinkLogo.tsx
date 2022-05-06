import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

export default function SiteLinkLogo (): JSX.Element {
  return (
    <LinkButton
      textColor='primary.500'
      fontWeight='bold'
      fontFamily='heading'
      variant='link'
      colorScheme='primary'
      href='/'
    >
      <Trans>overdoll</Trans>
    </LinkButton>
  )
}
