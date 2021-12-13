import { spacing } from '../index'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'

export default {
  title: 'Molecules/Spacing'
}

const Template = (): JSX.Element => {
  return (
    <Stack spacing={4}>
      {Object.keys(spacing)
        .sort((a, b) => {
          // @ts-expect-error
          return a - b
        })
        .map(size => (
          <Flex key={size} direction='row' align='center'>
            <Box mr={2} h={8} w={size} bg='gray.800' />
            <Text>{size}</Text>
          </Flex>
        ))}
    </Stack>
  )
}
export const Spacing = Template.bind({})
