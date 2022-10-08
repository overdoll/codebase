import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import React from 'react'

const FactItem = ({
  header,
  text,
  children,
  reverse = false
}) => {
  const target = (
    <Flex boxSizing='border-box' flex='0 1 auto' height='100%' width='48%'>
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
      >
        {reverse && target}
        <Flex
          flexDirection='column'
          flex='0 1 auto'
          height='100%'
          padding='0 3rem 0 0'
          width='52%'
        >
          <Heading
            as='h1'
            fontSize='4xl'
            color='white'
            lineHeight='1.1'
          >
            <Trans>
              {header}
            </Trans>
          </Heading>
          <Text
            mt={3}
            fontSize='xl'
            color='white'
          >
            <Trans>
              {text}
            </Trans>
          </Text>
        </Flex>
        {!reverse && target}
      </Flex>
    </Flex>
  )
}

export default FactItem
