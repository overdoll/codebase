import { Box, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { CheckCircle, DeleteCircle } from '@//:assets/icons'
import { CLUB_GUIDELINES } from '@//:modules/constants/links'

export default function CreatePostFooter (): JSX.Element {
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Heading color='gray.00' fontSize='2xl'>
          <Trans>
            As a reminder of the guidelines
          </Trans>
        </Heading>
        <Stack spacing={2}>
          <HStack align='center' spacing={3}>
            <Icon flexShrink={0} icon={CheckCircle} fill='gray.100' w={3} h={3} />
            <Heading fontSize='md' color='gray.100'>
              <Trans>
                All characters must be depicted as 18 or older
              </Trans>
            </Heading>
          </HStack>
          <HStack align='center' spacing={3}>
            <Icon flexShrink={0} icon={DeleteCircle} fill='gray.100' w={3} h={3} />
            <Heading fontSize='md' color='gray.100'>
              <Trans>
                Cannot contain themes of incest, non-consensual sexual behaviour, non-consensual mutilation,
                or bestiality
              </Trans>
            </Heading>
          </HStack>
          <HStack align='center' spacing={3}>
            <Icon flexShrink={0} icon={DeleteCircle} fill='gray.100' w={3} h={3} />
            <Heading fontSize='md' color='gray.100'>
              <Trans>
                Nothing extremely offensive, shocking, or illegal
              </Trans>
            </Heading>
          </HStack>
        </Stack>
      </Stack>
      <Box>
        <Text fontSize='md' color='gray.100'>
          <Trans>Upstanding netizens will read the{' '}
            <Link
              color='teal.300'
              fontSize='md'
              isExternal
              href={CLUB_GUIDELINES}
            >
              Club Guidelines
            </Link>{' '}carefully before posting
          </Trans>
        </Text>
      </Box>
    </Stack>
  )
}
