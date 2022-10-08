import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const FactItem = ({
  header,
  text,
  children,
  reverse = false
}) => {
  const target = (
    <Flex
      boxSizing='border-box'
      flex='0 1 auto'
      height='100%'
      width={['100%', '100%', '42%']}
    >
      <Box margin='-10% -5% -5% 0'>
        {children}
      </Box>
    </Flex>
  )

  return (
    <Flex padding='70px 45px' borderBottom='2px solid #222'>
      <Flex
        alignItems='center'
        justifyContent='center'
        margin='0 auto'
        maxWidth='1100px'
        flexDirection={['column', 'column', 'row']}
      >
        {reverse && target}
        <Flex
          flexDirection='column'
          flex='0 1 auto'
          height='100%'
          padding={['0', '0', '0 3rem 0 0']}
          width={['100%', '100%', '52%']}
          textAlign={['center', 'center', 'left']}
        >
          <Heading
            as='h1'
            fontSize={['2xl', '3xl', '4xl']}
            color='white'
            lineHeight='1.1'
          >
            {header}
          </Heading>
          <Text
            mt={3}
            fontSize={['md', 'lg', 'xl']}
            color='white'
          >
            {text}
          </Text>
        </Flex>
        {!reverse && target}
      </Flex>
    </Flex>
  )
}

export default FactItem
