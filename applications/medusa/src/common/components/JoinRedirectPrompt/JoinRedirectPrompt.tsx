import { LinkTile } from '@//:modules/content/ContentSelection'
import { Center, CenterProps, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import useAbility from '@//:modules/authorization/useAbility'
import React, { useMemo } from 'react'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'
import ImageMedia
  from '@//:modules/content/HookedComponents/Media/components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { InfoCircle } from '@//:assets/icons'

interface Props extends CenterProps {
  seed: string
}

export default function JoinRedirectPrompt (props: Props): JSX.Element {
  const {
    seed,
    ...rest
  } = props

  const ability = useAbility()
  const images = ['https://static.dollycdn.net/banners/market-banner-1.jpg', 'https://static.dollycdn.net/banners/market-banner-2.jpg', 'https://static.dollycdn.net/banners/market-banner-3.jpg', 'https://static.dollycdn.net/banners/market-banner-4.jpg']

  const memoized = useMemo(() => new Random(hash(seed)), [seed])

  const chosen = useMemo(() => memoized.nextInt32([0, (images.length - 1)]), [seed])

  if (ability.can('configure', 'Account')) {
    return <></>
  }

  return (
    <Center w='100%' {...rest}>
      <LinkTile w='auto' href='/join'>
        <Stack spacing={1}>
          <Flex
            borderRadius='lg'
            overflow='hidden'
            borderWidth={2}
            borderColor='dimmers.100'
            objectFit='contain'
            minW={320}
            maxW={400}
          >
            <ImageMedia
              url={images[chosen]}
            />
          </Flex>
          <HStack spacing={1}>
            <Icon icon={InfoCircle} w={3} h={3} fill='whiteAlpha.300' />
            <Text fontSize='xs' color='whiteAlpha.300'>
              <Trans>
                Join overdoll to hide this
              </Trans>
            </Text>
          </HStack>
        </Stack>
      </LinkTile>
    </Center>

  )
}
