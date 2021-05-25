import Input from '../Input'
import { Form, useForm } from '@//:modules/form'

export default {
  title: 'Form/Input',
  component: Input
}

const Template = args => {
  const form = useForm()

  return (
    <Form instance={form} onSubmit={() => {}}>
      <Input name='Title' title='Title' {...args} />
    </Form>
  )
}

export const Default = Template.bind({})
Default.args = {}
