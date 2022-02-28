import { Box, Center, Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { ReactNode, useContext } from 'react'
import { VerticalNavigationContext } from '../VerticalNavigation'
import { LargeBackgroundBox, PageWrapper } from '../../../PageLayout'

interface Props {
  children: ReactNode
  title?: ReactNode | null
  outsideElements?: ReactNode | null
}

export default function VerticalNavigationContent (props: Props): JSX.Element {
  const { isExtended } = useContext(VerticalNavigationContext)

  if (isExtended) {
    return (
      <PageWrapper>
        <LargeBackgroundBox>
          <Stack spacing={2}>
            <Stack spacing={1}>
              {props.title != null &&
                <Flex justify='center' align='center' px={2} pt={2}>
                  <Heading fontSize='xl' color='gray.00'>
                    {props.title}
                  </Heading>
                </Flex>}
              {props.outsideElements != null &&
                <Box px={2}>
                  {props.outsideElements}
                </Box>}
            </Stack>
            <Stack spacing={3}>
              {props.children}
            </Stack>
          </Stack>
        </LargeBackgroundBox>
      </PageWrapper>
    )
  }

  return (
    <>
      <Center
        display={{
          base: 'flex',
          md: 'none'
        }}
        mt={4}
      >
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          bg='gray.800'
          borderRadius='base'
          zIndex='sidebar'
          overflowX='hidden'
        >
          <Stack spacing={1}>
            {props.title != null &&
              <Flex justify='center' align='center' px={2} pt={2}>
                <Heading fontSize='xl' color='gray.00'>
                  {props.title}
                </Heading>
              </Flex>}
            {props.outsideElements != null &&
              <Box px={2}>
                {props.outsideElements}
              </Box>}
          </Stack>
          <HStack p={2} overflowX='auto' spacing={3}>
            {props.children}
          </HStack>
        </Flex>
      </Center>
      <Box
        bg='gray.800'
        w='300px'
        h='calc(100vh - 54px)'
        pr={4}
        pb={6}
        pl={2}
        pt={4}
        boxShadow='md'
        overflowY='auto'
        flexShrink={0}
        position='fixed'
        zIndex='sidebar'
        overflowX='hidden'
        display={{
          base: 'none',
          md: 'initial'
        }}
      >
        {props.title != null &&
          <Box mb={4}>
            <Heading fontSize='xl' color='gray.00'>
              {props.title}
            </Heading>
          </Box>}
        <Stack spacing={3}>
          {props.outsideElements}
          {props.children}
        </Stack>
      </Box>
    </>
  )
}
