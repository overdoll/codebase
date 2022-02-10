import { Box, Heading, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  title: ReactNode
  description: ReactNode
}

export default function PagePanelText ({
  title,
  description
}: Props): JSX.Element {
  return (
    <Box>
      <Heading
        color='gray.100'
        fontSize='lg'
      >
        {title}
      </Heading>
      <Text
        fontFamily='body'
        fontWeight='semibold'
        textAlign='left'
        color='gray.200'
        fontSize='sm'
      >
        {description}
      </Text>
    </Box>
  )
}
