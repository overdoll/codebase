import { Box, Heading, Stack, StackProps } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import RandomPattern from '@//:modules/content/PageLayout/Display/components/RandomPattern/RandomPattern'
import { ReactNode } from 'react'
import { IconType } from '@//:types/components'

interface Props {
  children: ReactNode
  colorScheme: string
  icon: IconType
  seed: string
  text: ReactNode
}

export default function ClubIconBanner ({
  children,
  colorScheme,
  icon,
  seed,
  text
}: Props): JSX.Element {
  const STACK_PROPS: StackProps = {
    py: {
      base: 2,
      md: 4
    },
    px: {
      base: 2,
      md: 3
    },
    direction: {
      base: 'column',
      md: 'row'
    },
    align: 'center',
    spacing: {
      base: 2,
      md: 4
    }
  }

  return (
    <TileOverlay
      backdrop={<RandomPattern seed={seed} />}
    >
      <Stack {...STACK_PROPS}>
        <Box borderRadius='lg' bg={`${colorScheme}.300`} p={2}>
          <Icon icon={icon} w={10} h={10} fill={`${colorScheme}.100`} />
        </Box>
        <Stack spacing={2}>
          <Heading
            textAlign={{
              base: 'center',
              md: 'left'
            }}
            fontSize='lg'
            color='gray.00'
          >
            {text}
          </Heading>
          {children}
        </Stack>
      </Stack>
    </TileOverlay>
  )
}
