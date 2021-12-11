/**
 * @flow
 */
import type { Node } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

type Props = {
  title: string,
  description: string
};

export default function PagePanelText ({ title, description }: Props): Node {
  return (
    <Box>
      <Heading color='gray.100' fontSize='lg'>
        {title}
      </Heading>
      <Text fontFamily='body' fontWeight='semibold' textAlign='left' color='gray.200' fontSize='sm'>
        {description}
      </Text>
    </Box>
  )
}
