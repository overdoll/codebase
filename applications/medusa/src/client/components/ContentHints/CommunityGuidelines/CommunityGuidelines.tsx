import { ButtonProps } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/form/LinkButton/LinkButton'

export default function CommunityGuidelines ({ ...rest }: ButtonProps): JSX.Element {
  return (
    <LinkButton
      to='#'
      size='sm'
      colorScheme='teal'
      variant='link'
      {...rest}
    >
      <Trans>
        Community Guidelines
      </Trans>
    </LinkButton>
  )
}
