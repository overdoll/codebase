import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import Icon from '../../../../../../../PageLayout/BuildingBlocks/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  tiny?: boolean
}

export default function ImageError ({ tiny }: Props): JSX.Element {
  if (tiny === true) {
    return (
      <Flex
        justify='center'
        align='center'
        position='absolute'
        w={4}
        h={4}
      >
        <Icon icon={WarningTriangle} fill='gray.500' />
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
      position='absolute'
      spacing={2}
    >
      <Icon icon={WarningTriangle} w={6} h={6} fill='orange.300' />
      <Box>
        <Heading textAlign='center' fontSize='md' color='orange.300'>
          <Trans>
            Error Loading Image
          </Trans>
        </Heading>
        <Text lineHeight={1.2} textAlign='center' fontSize='xs' color='orange.100'>
          <Trans>
            Try refreshing the page to fix the error
          </Trans>
        </Text>
      </Box>
    </Stack>
  )
}
