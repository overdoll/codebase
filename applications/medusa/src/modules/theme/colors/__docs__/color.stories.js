import colors from '@//:modules/theme/colors';
import ColorCircle from '../../../../../.storybook/components/color/color';
import { Text, Flex, HStack, Heading, Stack } from '@chakra-ui/react';

export default {
  title: 'Molecules/Colors',
  component: ColorCircle,
};

const Template = args => {
  return (
    <Stack spacing={6}>
      {Object.keys(colors).map(group => (
        <Flex key={group} direction="column">
          <Heading color="gray.00" size="lg">
            {group}
          </Heading>
          <HStack>
            {Object.keys(colors[group])
              .sort((a, b) => {
                return a - b;
              })
              .map(color => (
                <Flex key={color} direction="column" align="center">
                  <Text fontSize="lg" color="gray.100">
                    {color}
                  </Text>
                  <ColorCircle {...args} color={colors[group][color]} />
                </Flex>
              ))}
          </HStack>
        </Flex>
      ))}
    </Stack>
  );
};
export const Colors = Template.bind({});
Colors.args = {
  size: '50px',
};
Colors.parameters = {};
