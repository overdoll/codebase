import Input from '../Input';
import { Form, useForm } from '@//:modules/form';

export default {
  title: 'Form/Input',
  component: Input,
};

// 👇 We create a “template” of how args map to rendering
const Template = args => {
  const form = useForm();

  return (
    <Form instance={form} onSubmit={() => {}}>
      <Input name="test" title="test" {...args} />
    </Form>
  );
};

// 👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {};
