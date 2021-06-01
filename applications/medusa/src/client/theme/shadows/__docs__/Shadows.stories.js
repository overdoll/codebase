import shadows from '../index'
import { Stack, Box } from '@chakra-ui/react'

export default {
  title: 'Molecules/Shadows'
}

const Template = () => {
  return (
    <Stack spacing={12} align='center'>
      {Object.keys(shadows).map(shadow => (
        <Box
          key={shadow}
          h={40}
          w={40}
          bg='gray.00'
          align='center'
          color='gray.900'
          boxShadow={shadow}
        >
          {shadow}
        </Box>
      ))}
    </Stack>
  )
}
export const Shadows = Template.bind({})
