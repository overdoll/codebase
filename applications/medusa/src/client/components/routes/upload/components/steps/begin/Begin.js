/**
 * @flow
 */
import type { Node } from 'react';
import {
  Heading,
  Text,
  Box,
  List,
  ListItem,
  ListIcon,
  UnorderedList,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Icon from '@//:modules/content/icon/Icon';
import LargeUpload from './components/upload/LargeUpload';
import RoadSignNoEntry from '@streamlinehq/streamlinehq/img/streamline-bold/road-sign-no-entry-49rOC0.svg';

type Props = {
  uppy: any,
  onAddFiles: any,
};

export default function Begin({ uppy, onAddFiles }: Props): Node {
  const [t] = useTranslation('upload');

  return (
    <>
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
        <UnorderedList>
          <ListItem>{t('rules.rule1')}</ListItem>
          <ListItem>{t('rules.rule2')}</ListItem>
        </UnorderedList>
      </Box>
    </>
  );
}
