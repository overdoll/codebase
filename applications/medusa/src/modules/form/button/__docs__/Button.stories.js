import Button from '../Button';

export default {
  title: 'Form/Button',
  component: Button,
};

// 👇 We create a “template” of how args map to rendering
const Template = args => <Button {...args}>Click Me</Button>;

// 👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {};
