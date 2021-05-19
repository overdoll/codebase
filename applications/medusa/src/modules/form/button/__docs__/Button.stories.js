import Button from '../Button';

export default {
  title: 'Form/Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Click Me</Button>;

export const Default = Template.bind({});
Default.args = {};
