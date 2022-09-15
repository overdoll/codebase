import { Box, Heading, HStack } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { ReactNode } from 'react'

interface Props {
  title: string
  type: ReactNode
  totalPosts: number
  totalLikes: number
}

export default function SearchSummary ({
  title,
  type,
  totalPosts,
  totalLikes
}: Props): JSX.Element {
  const responsiveFont = {
    base: 'lg',
    md: '2xl'
  }

  return (
    <LargeBackgroundBox>
      <HStack>
        <HStack align='center' w='100%' spacing={2} justify='space-between'>
          <Box>
            <Heading
              noOfLines={2}
              fontSize={responsiveFont}
              color='gray.100'
            >
              {title}
            </Heading>
            <Heading noOfLines={1} lineHeight={1} fontSize='sm' color='gray.200'>
              {type}
            </Heading>
          </Box>
        </HStack>
      </HStack>
    </LargeBackgroundBox>
  )
}
