import radius from '@//:modules/theme/radius'
import { Stack, Box } from '@chakra-ui/react'

export default {
  title: 'Molecules/Radius'
}

const Template = () => {
  return (
    <Stack spacing={12} align='center'>
      {Object.keys(radius).map(radius => (
        <Box
          key={radius}
          h={40}
          w={40}
          bg='gray.00'
          align='center'
          color='gray.900'
          borderRadius={radius}
        >
          {radius}
        </Box>
      ))}
    </Stack>
  )
}
export const Radius = Template.bind({})
