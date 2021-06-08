import { Wrap } from '@chakra-ui/react'
import Element from '../Element'

const PostImage1 = '/posts/1pcKibRoqTAUgmOiNpGLIrztM9R.png'

export default {
  title: 'Content/Element',
  component: Element,
  decorators: [
    (Story) => (
      <Wrap mt={40} justify='center'>
        <Story />
      </Wrap>
    )
  ]
}

const Template = ({
  elementCount,
  title,
  subheader,
  ...args
}) => {
  const largeData = Array(elementCount).fill(PostImage1)

  return (
    <>
      {largeData.map((image, index) => (<Element
        key={index}
        title={title} subheader={subheader} thumbnail={image} {...args}
                                        />)
      )}
    </>
  )
}

export const Global = Template.bind({})

Global.argTypes = {
  elementCount: { control: { type: 'range', min: 0, max: 20 }, defaultValue: 3 },
  title: { control: { type: 'text' }, defaultValue: 'Header' },
  subheader: { control: { type: 'text' }, defaultValue: 'Subheader' }
}
