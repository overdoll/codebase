import { Input } from '@chakra-ui/react';
import InputTheme from '../index';

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
  return (
    <Input placeholder='placeholder' {...args} />
  )
}

export const Global = Template.bind({})
Global.args = {}
