import typography from '../index'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'

export default {
  title: 'Molecules/Typography'
}

const Template = (): JSX.Element => {
  return (
    <Stack spacing={20}>
      <Flex direction='column'>
        <Heading color='gray.00' size='lg'>
          Weights
        </Heading>
        <Stack>
          {Object.keys(typography.fontWeights).map(weight => (
            <Text key={weight} color='gray.100' fontWeight={weight}>
              {weight}
            </Text>
          ))}
        </Stack>
      </Flex>
      <Flex direction='column'>
        <Heading color='gray.00' size='lg'>
          Heading - {typography.fonts.heading}
        </Heading>
        <Stack>
          {Object.keys(typography.fontSizes).map(size => (
            <Heading key={size} color='gray.100' size={size}>
              ({size}) The quick brown fox jumps over the lazy dog
            </Heading>
          ))}
        </Stack>
      </Flex>
      <Flex direction='column'>
        <Heading color='gray.00' size='lg'>
          Body - {typography.fonts.body}
        </Heading>
        <Stack>
          {Object.keys(typography.fontSizes).map(size => (
            <Text key={size} color='gray.100' fontSize={size}>
              ({size}) The quick brown fox jumps over the lazy dog
            </Text>
          ))}
        </Stack>
      </Flex>
    </Stack>
  )
}
export const Typography = Template.bind({})
