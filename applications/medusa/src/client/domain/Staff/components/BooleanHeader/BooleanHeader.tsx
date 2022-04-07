import { Badge } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  isEnabled: boolean
}

export default function BooleanHeader ({
  isEnabled
}: Props): JSX.Element {
  if (isEnabled) {
    return (
      <SmallBackgroundBox>
        <Badge colorScheme='green' fontFamily='mono' fontSize='xl'>
          <Trans>
            Yes
          </Trans>
        </Badge>
      </SmallBackgroundBox>
    )
  }

  return (
    <SmallBackgroundBox>
      <Badge colorScheme='orange' fontFamily='mono' fontSize='xl'>
        <Trans>
          No
        </Trans>
      </Badge>
    </SmallBackgroundBox>
  )
}
