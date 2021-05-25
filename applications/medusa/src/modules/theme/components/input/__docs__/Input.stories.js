import { Input } from '@chakra-ui/react'
import { Form, useForm } from '@//:modules/form'
import InputTheme from '@//:modules/theme/components/input/index'

export default {
  title: 'Form/ChakraInput',
  component: Input,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: Object.keys(InputTheme.sizes)
      }
    },
    variant: {
      control: {
        type: 'select',
        options: Object.keys(InputTheme.variants)
      }
    }
  },
  args: {
    size: 'md',
    variant: 'outline'
  }
}

const Template = args => {
  const form = useForm()

  return (
    <Form instance={form} onSubmit={() => {}}>
      <Input placeholder='placeholder' {...args} />
    </Form>
  )
}

export const Global = Template.bind({})
Global.args = {}
