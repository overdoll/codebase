import radius from '../index'
import { Box, Stack } from '@chakra-ui/react'

export default {
  title: 'Molecules/Radius'
}

const Template = (): JSX.Element => {
  return (
    <Stack spacing={12} align='center'>
      {Object.keys(radius).map(radius => (
        <Box
          key={radius}
          h={40}
          w={40}
          bg='gray.800'
          align='center'
          color='gray.100'
          borderRadius={radius}
        >
          {radius}
        </Box>
      ))}
    </Stack>
  )
}
export const Radius = Template.bind({})
