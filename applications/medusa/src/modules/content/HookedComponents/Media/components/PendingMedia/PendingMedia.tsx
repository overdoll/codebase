import Icon from '../../../../PageLayout/BuildingBlocks/Icon/Icon'
import { SuccessBox } from '@//:assets/icons'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

export default function PendingMedia (): JSX.Element {
  return (
    <Stack p={2} spacing={1}>
      <Icon icon={SuccessBox} w={6} h={6} fill='gray.200' />
      <Heading textAlign='center' fontSize='sm' color='gray.200'>
        <Trans>Post queued for processing</Trans>
      </Heading>
    </Stack>
  )
}
