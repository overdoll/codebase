/**
 * @flow
 */
import type { Node } from 'react'
import Picker from '../../../../picker/Picker'
import { Flex, Heading, Text, Center, Box } from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import ShipmentUpload from '@streamlinehq/streamlinehq/img/streamline-regular/shipment-upload-PvJIK9.svg'
import type { Uppy } from '@uppy/core'

type Props = {
  uppy: Uppy,
  onSelect: () => void,
  topText: string,
  botText: string,
  test
};

export default function LargeUpload ({
  uppy,
  onSelect,
  topText,
  botText,
  test,
}: Props): Node {

  return (
    <Center>
      <Box bg='gray.800' w='100%' p={4} mt={8} mb={8} borderRadius={10}>
        <Box p={4} borderRadius={10} borderColor='teal.50' borderWidth={4}>
          <Picker uppy={uppy} onSelect={onSelect}>
            <Flex w='100%' flexDirection='column' alignItems='center'>
              <Icon
                icon={ShipmentUpload}
                color='teal.200'
                w={24}
                h={24}
                m={2}
              />
              <Heading fontSize='2xl' color='teal.200' m={1}>
                {topText}
              </Heading>
              <Text fontSize='lg' color='teal.100'>
                {botText}
              </Text>
            </Flex>
          </Picker>
        </Box>
      </Box>
    </Center>
  )
}
