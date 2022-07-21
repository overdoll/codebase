import { Heading, HStack, Stack, StackProps } from '@chakra-ui/react'
import { Icon } from '../../../../PageLayout'
import { DownloadArrow, TapButton } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props extends StackProps {
}

export default function UploadActionsDisplay ({
  ...rest
}: Props): JSX.Element {
  return (
    <Stack spacing={2} {...rest}>
      <HStack spacing={1}>
        <Icon
          w={5}
          h={5}
          icon={DownloadArrow}
          fill='gray.200'
        />
        <Heading fontSize='md' color='gray.200'>
          <Trans>
            Drop
          </Trans>
        </Heading>
      </HStack>
      <HStack spacing={1}>
        <Icon
          w={5}
          h={5}
          icon={TapButton}
          fill='gray.200'
        />
        <Heading fontSize='md' color='gray.200'>
          <Trans>
            Tap
          </Trans>
        </Heading>
      </HStack>
    </Stack>
  )
}
