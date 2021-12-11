import Button from '../'
import { Center, Stack } from '@chakra-ui/react'

export default {
  title: 'Form/Button',
  component: Button,
  decorators: [
    (Story) => (
      <Center mt={40}>
        <Story />
      </Center>
    )
  ]
}

const Template = args => (
  <>
    <Stack spacing={8}>
      <Stack w='auto' direction='row' align='center'>
        <Button {...args} size='sm' colorScheme='gray'>Click Me</Button>
        <Button {...args} size='md' colorScheme='gray'>Click Me</Button>
        <Button {...args} size='lg' colorScheme='gray'>Click Me</Button>
        <Button {...args} size='xl' colorScheme='gray'>Click Me</Button>
      </Stack>
      <Stack w='auto' direction='row' align='center'>
        <Button {...args} size='sm' colorScheme='red'>Click Me</Button>
        <Button {...args} size='md' colorScheme='red'>Click Me</Button>
        <Button {...args} size='lg' colorScheme='red'>Click Me</Button>
        <Button {...args} size='xl' colorScheme='red'>Click Me</Button>
      </Stack>
      <Stack w='auto' direction='row' align='center'>
        <Button {...args} size='sm' colorScheme='orange'>Click Me</Button>
        <Button {...args} size='md' colorScheme='orange'>Click Me</Button>
        <Button {...args} size='lg' colorScheme='orange'>Click Me</Button>
        <Button {...args} size='xl' colorScheme='orange'>Click Me</Button>
      </Stack>
    </Stack>
  </>
)

export const Primary = Template.bind({})

Primary.args = {
  variant: 'outline'
}
Primary.parameters = {}

export const Secondary = Template.bind({})

Secondary.args = { variant: 'solid' }

export const Tertiary = Template.bind({})

Tertiary.args = { variant: 'ghost' }

export const Link = Template.bind({})

Link.args = { variant: 'link', size: 'sm', colorScheme: 'red' }
