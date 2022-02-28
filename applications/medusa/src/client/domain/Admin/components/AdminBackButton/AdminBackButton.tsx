import { Box } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ArrowButtonLeft } from '@//:assets/icons/navigation'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Icon } from '@//:modules/content/PageLayout'

interface Props {
  to: string
}

export default function AdminBackButton ({
  to
}: Props): JSX.Element {
  return (
    <Box w='100%' mb={4}>
      <LinkButton
        leftIcon={<Icon icon={ArrowButtonLeft} fill='inherit' w={3} h={3} />}
        w='100%'
        size='md'
        variant='solid'
        to={to}
      >
        <Trans>
          Back to search
        </Trans>
      </LinkButton>
    </Box>
  )
}
