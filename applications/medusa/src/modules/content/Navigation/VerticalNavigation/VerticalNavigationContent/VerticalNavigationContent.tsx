import { Box, Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { ReactNode, useContext } from 'react'
import { VerticalNavigationContext } from '../VerticalNavigation'
import { LargeBackgroundBox, MobileContainer, PageContainer } from '../../../PageLayout'

interface Props {
  children: ReactNode
  title?: ReactNode | null
  outsideElements?: ReactNode | null
}

export default function VerticalNavigationContent (props: Props): JSX.Element {
  const { isExtended } = useContext(VerticalNavigationContext)

  if (isExtended) {
    return (
      <PageContainer>
        <MobileContainer>
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
        </MobileContainer>
      </PageContainer>
    )
  }

  return (
    <>
      <PageContainer
        display={{
          base: 'flex',
          md: 'none'
        }}
        mt={4}
        mb={undefined}
      >
        <MobileContainer>
          <Flex
            direction='column'
            bg='gray.900'
            borderRadius='base'
            zIndex='sidebar'
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
        </MobileContainer>
      </PageContainer>
      <Box
        bg='gray.900'
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
