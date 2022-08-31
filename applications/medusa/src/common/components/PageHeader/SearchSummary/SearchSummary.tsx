import { Box, Heading, HStack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { FileMultiple } from '@//:assets/icons'
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
  const responsiveSize = {
    base: 4,
    md: 6
  }

  const responsiveFont = {
    base: 'lg',
    md: '2xl'
  }

  const responsiveSpacing = {
    base: 1,
    md: 2
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
          <HStack spacing={responsiveSpacing} align='center'>
            <Icon icon={FileMultiple} w={responsiveSize} h={responsiveSize} fill='gray.200' />
            <Heading fontSize={responsiveFont} color='gray.200'>
              {totalPosts}
            </Heading>
          </HStack>
        </HStack>
      </HStack>
    </LargeBackgroundBox>
  )
}
