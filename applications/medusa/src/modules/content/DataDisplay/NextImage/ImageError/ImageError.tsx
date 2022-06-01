import { Heading, Stack } from '@chakra-ui/react'
import Icon from '../../../PageLayout/Flair/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function ImageError (): JSX.Element {
  return (
    <Stack borderRadius='md' p={4} bg='dimmers.500' direction='column' justify='center' align='center' spacing={2}>
      <Icon icon={WarningTriangle} w={6} h={6} fill='orange.300' />
      <Heading fontSize='md' color='orange.300'>
        <Trans>
          Error Loading Image
        </Trans>
      </Heading>
    </Stack>
  )
}
