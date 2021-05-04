/**
 * @flow
 */
import type { Node } from 'react';
import { Center, Flex, Heading, Text, Box, Spacer } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import LargeUpload from './components/upload/LargeUpload';
import Picker from '../../picker/Picker';

type Props = {
  uppy: any,
  onAddFiles: any,
};

export default function Begin({ uppy, onAddFiles }: Props): Node {
  const [t] = useTranslation('upload');

  return (
    <Center mt={8}>
      <Flex w={['sm', 'md', 'lg']} ml={[1, 0]} mr={[1, 0]} direction="column">
        <Box>
          <Heading fontSize="3xl" color="gray.00">
            {t('begin.header')}
          </Heading>
          <Text fontSize="lg" mt={2} color="gray.100">
            {t('begin.subheader')}
          </Text>
        </Box>
        <LargeUpload
          uppy={uppy}
          onSelect={onAddFiles}
          topText={t('begin.uploader')}
          botText={t('begin.limit')}
        />
        <Box>
          <Heading fontSize="2xl" color="gray.00">
            {t('rules.header')}
          </Heading>
          <Text fontSize="lg" mt={2} color="gray.100">
            {t('rules.subheader')}
          </Text>
        </Box>
      </Flex>
    </Center>
  );
}
