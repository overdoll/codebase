import colors from '../index'
import ColorCircle from '../../../../../.storybook/components/color/color'
import { Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'

export default {
  title: 'Molecules/Colors',
  component: ColorCircle
}

const Template = (args): JSX.Element => {
  return (
    <Stack spacing={6}>
      {Object.keys(colors).map(group => (
        <Flex key={group} direction='column'>
          <Heading color='gray.00' size='lg'>
            {group}
          </Heading>
          <HStack>
            {Object.keys(colors[group])
              .sort((a, b) => {
                // @ts-expect-error
                return a - b
              })
              .map(color => (
                <Flex key={color} direction='column' align='center'>
                  <Text fontSize='lg' color='gray.100'>
                    {color}
                  </Text>
                  <ColorCircle {...args} color={colors[group][color]} />
                </Flex>
              ))}
          </HStack>
        </Flex>
      ))}
    </Stack>
  )
}
export const Colors = Template.bind({})
Colors.args = {
  size: '50px'
}
Colors.parameters = {}
