import { Box } from '@chakra-ui/react'

export default function NoScript (): JSX.Element {
  return (
    <noscript>
      <Box
        left={0}
        right={0}
        backgroundColor='white'
        top={0}
        w='100vw'
        h='100vh'
        bottom={0}
        zIndex={100000000000000000000}
        position='absolute'
        overflowY='auto'
        overflowX='hidden'
      >
        javascript must be enabled for this site to work. sorry!
      </Box>
    </noscript>
  )
}
