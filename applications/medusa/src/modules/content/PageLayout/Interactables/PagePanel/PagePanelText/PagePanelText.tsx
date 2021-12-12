import { Box, Heading, Text } from '@chakra-ui/react'

interface Props {
  title: string
  description: string
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
