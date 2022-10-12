import { Box, Flex } from '@chakra-ui/react'
import { ActionUnlock } from '@//:assets/icons'
import { Icon } from '../../../../PageLayout'

export default function PreviewUnlockShadow (): JSX.Element {
  return (
    <>
      <Box
        h={800}
        zIndex={1}
        bgGradient='linear(to-b, transparent, dimmers.100, dimmers.500,dimmers.700, dimmers.800, dimmers.900, dimmers.900, dimmers.900)'
        position='absolute'
        bottom={0}
        left={0}
        right={0}
      />
      <Flex justify='center' zIndex={1} position='absolute' bottom={0} h={200} w='100%'>
        <Icon fill='gray.00' w={16} h={16} icon={ActionUnlock} />
      </Flex>
    </>
  )
}
