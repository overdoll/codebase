import { Box, Center, Flex, Stack } from '@chakra-ui/react'
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
            {props.title != null && <PageSectionWrap mb={4}>
              <PageSectionTitle>
                {props.title}
              </PageSectionTitle>
            </PageSectionWrap>}
            <Stack spacing={3}>
              {props.children}
            </Stack>
          </SmallBackgroundBox>
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
        display={{
          base: 'none',
          md: 'initial'
        }}
      >
        {props.title != null && <PageSectionWrap mb={4}>
          <PageSectionTitle>
            {props.title}
          </PageSectionTitle>
        </PageSectionWrap>}
        <Stack spacing={3}>
          {props.children}
        </Stack>
      </Box>
    </>
  )
}
