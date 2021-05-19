import colors from '@//:modules/theme/colors';
import ColorCircle from '../../../../../.storybook/components/color/color';

export default {
  title: 'Molecules/Colors',
  component: ColorCircle,
};

const Template = args => {
  return <ColorCircle color="red.500" size={40} />;
};

export const Colors = Template.bind({});
Colors.args = {};
Colors.parameters = {};
