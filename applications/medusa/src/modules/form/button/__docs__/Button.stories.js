import Button from '../Button';
import ButtonTheme from '@//:modules/theme/components/button/index';
import colors from '@//:modules/theme/colors';

export default {
  title: 'Form/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: Object.keys(ButtonTheme.sizes),
      },
    },
    colorScheme: {
      control: {
        type: 'select',
        options: Object.keys(colors),
      },
    },
  },
  args: {
    colorScheme: 'gray',
    size: 'md',
  },
};

const Template = args => <Button {...args}>Click Me</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'outline',
};
Primary.parameters = {};

export const Secondary = Template.bind({});
Secondary.args = { variant: 'solid' };

export const Tertiary = Template.bind({});
Tertiary.args = { variant: 'ghost' };

export const Link = Template.bind({});
Link.args = { variant: 'link' };
