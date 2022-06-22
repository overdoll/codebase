import { Flex, Heading, Stack } from '@chakra-ui/react'
import Icon from '../../../PageLayout/Flair/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  tiny?: boolean
}

export default function ImageError ({ tiny }: Props): JSX.Element {
  if (tiny === true) {
    return (
      <Flex
        p={2}
        justify='center'
        align='center'
        w='100%'
        h='100%'
      >
        <Icon icon={WarningTriangle} w='100%' h='100%' fill='orange.300' />
      </Flex>
    )
  }

  return (
    <Stack
      borderRadius='md'
      p={4}
      w={200}
      bg='dimmers.500'
      direction='column'
      justify='center'
      align='center'
      spacing={2}
    >
      <Icon icon={WarningTriangle} w={6} h={6} fill='orange.300' />
      <Heading textAlign='center' fontSize='md' color='orange.300'>
        <Trans>
          Error Loading Image
        </Trans>
      </Heading>
    </Stack>
  )
}
