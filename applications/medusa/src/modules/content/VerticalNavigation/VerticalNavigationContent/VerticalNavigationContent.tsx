import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '../../PageLayout'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title?: ReactNode | null
}

export default function VerticalNavigationContent (props: Props): JSX.Element {
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
        >
          <SmallBackgroundBox>
            {props.title != null && <PageSectionWrap>
              <PageSectionTitle>{props.title}</PageSectionTitle>
            </PageSectionWrap>}
            <Stack spacing={2}>
              {props.children}
            </Stack>
          </SmallBackgroundBox>
        </Flex>
      </Center>
      <Box
        bg='gray.800'
        w='260px'
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
        <Flex
          w='100%'
          align='center'
          justify='space-between'
          mb={3}
        >
          <Heading
            color='gray.00'
            ml={1}
            size='md'
          >{props.title}
          </Heading>
        </Flex>
        <Stack spacing={2}>
          {props.children}
        </Stack>
      </Box>
    </>
  )
}
