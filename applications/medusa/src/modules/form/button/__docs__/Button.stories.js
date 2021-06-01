import Button from '../'

export default {
  title: 'Form/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        // TODO: use chakra hooks for grabbing theme?
        options: []
        // options: Object.keys(ButtonTheme)
      }
    },
    colorScheme: {
      control: {
        type: 'select',
        options: []
        // options: Object.keys(colors)
      }
    }
  },
  args: {
    colorScheme: 'gray',
    size: 'md'
  }
}

const Template = args => (<Button {...args}>Click Me</Button>)

export const Primary = Template.bind({})
Primary.args = {
  variant: 'outline',
  size: 'xl',
  colorScheme: 'red'
}
Primary.parameters = {}

export const Secondary = Template.bind({})
Secondary.args = { variant: 'solid', size: 'lg', colorScheme: 'red' }

export const Tertiary = Template.bind({})
Tertiary.args = { variant: 'ghost', size: 'md', colorScheme: 'red' }

export const Link = Template.bind({})
Link.args = { variant: 'link', size: 'sm', colorScheme: 'red' }
