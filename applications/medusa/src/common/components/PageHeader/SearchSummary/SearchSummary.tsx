import { Box, Heading, HStack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { FileMultiple, HeartFull } from '@//:assets/icons'
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
  return (
    <LargeBackgroundBox>
      <HStack>
        <HStack align='center' w='100%' spacing={2} justify='space-between'>
          <Box>
            <Heading fontSize='2xl' color='gray.100'>
              {title}
            </Heading>
            <Heading lineHeight={1} fontSize='sm' color='gray.200'>
              {type}
            </Heading>
          </Box>
          <HStack spacing={6}>
            <HStack spacing={2} align='center'>
              <Icon icon={FileMultiple} w={6} h={6} fill='gray.200' />
              <Heading fontSize='2xl' color='gray.200'>
                {totalPosts}
              </Heading>
            </HStack>
            <HStack spacing={2} align='center'>
              <Icon icon={HeartFull} w={6} h={6} fill='gray.200' />
              <Heading fontSize='2xl' color='gray.200'>
                {totalLikes}
              </Heading>
            </HStack>
          </HStack>
        </HStack>
      </HStack>
    </LargeBackgroundBox>
  )
}
