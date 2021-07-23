/**
 * @flow
 */
import type { Node } from 'react'
import { Heading, Text, Box, ListItem, UnorderedList, Flex, Center } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Picker from '../../picker/Picker'
import Icon from '@//:modules/content/Icon/Icon'
import DragOver from '../../dragover/DragOver'

import Cloud from '@streamlinehq/streamlinehq/img/streamline-regular/internet-networks-servers/cloud/cloud.svg'

type Props = {
  uppy: Uppy,
};

export default function Begin ({ uppy }: Props): Node {
  const [t] = useTranslation('upload')

  return (
    <>
      <Box>
        <Heading fontSize='3xl' color='gray.00'>
          {t('begin.header')}
        </Heading>
      </Box>
      <Center mt={8} mb={8}>
        <Picker uppy={uppy}>
          <DragOver uppy={uppy}>

            <Box
              w='100%' boxShadow='md' bg='gray.800' p={4}
              borderRadius={15}
            >
              <Box p={4} borderRadius={15} borderStyle='dashed' borderColor='gray.50' borderWidth={4}>
                <Flex ml={2} mr={2} mt={12} mb={12} flexDirection='column' alignItems='center'>
                  <Icon
                    icon={Cloud}
                    color='red.300'
                    w={20}
                    h={20}
                    mb={2}
                  />
                  <Heading fontSize='2xl' color='gray.00' mb={8}>
                    {t('begin.uploader', { count: uppy.opts.restrictions.maxNumberOfFiles })}
                  </Heading>
                  <Text fontSize='lg' color='gray.100' mb={4}>
                    {uppy.opts.restrictions.allowedFileTypes.map(item => {
                      return item.split('/')[1]
                    }).join(', ')}
                  </Text>
                  <Text fontSize='lg' color='gray.100'>
                    {t('begin.limit', { limit: `${uppy.opts.restrictions.maxFileSize / 1000000}mb` })}
                  </Text>
                </Flex>
              </Box>
            </Box>
          </DragOver>
        </Picker>
      </Center>
      <Box>
        <Heading fontSize='2xl' color='gray.00'>
          {t('rules.header')}
        </Heading>
        <UnorderedList>
          <ListItem>{t('rules.rule1')}</ListItem>
          <ListItem>{t('rules.rule2')}</ListItem>
          <ListItem>{t('rules.rule3')}</ListItem>
        </UnorderedList>
      </Box>

    </>
  )
}
