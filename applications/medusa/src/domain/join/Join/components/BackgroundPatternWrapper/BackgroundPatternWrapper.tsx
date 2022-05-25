import { ReactNode } from 'react'
import { OverlappingPlus } from '@//:assets/icons'
import IconPattern from '@//:modules/content/PageLayout/Flair/IconPattern/IconPattern'
import { Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function BackgroundPatternWrapper ({ children }: Props): JSX.Element {
  return (
    <Box w='100%' h='100%' position='relative'>
      <Box w='100%' h='100%' position='absolute'>
        {children}
      </Box>
      <Box h='100%' bottom={0}>
        <IconPattern
          opacity='0.5'
          zoom='medium'
          icon={OverlappingPlus}
          fill='gray.500'
        />
      </Box>
    </Box>

  )
}
