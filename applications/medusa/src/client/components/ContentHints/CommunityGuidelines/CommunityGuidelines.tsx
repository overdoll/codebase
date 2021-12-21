import Button from '@//:modules/form/Button/Button'
import Link from '@//:modules/routing/Link'
import { ButtonProps } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

export default function CommunityGuidelines ({ ...rest }: ButtonProps): JSX.Element {
  return (
    <Link to='#'>
      <Button
        size='sm'
        colorScheme='teal'
        variant='link'
        {...rest}
      >
        <Trans>
          Community Guidelines
        </Trans>
      </Button>
    </Link>
  )
}
