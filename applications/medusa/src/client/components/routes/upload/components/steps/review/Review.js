/**
 * @flow
 */
import type { Node } from 'react';
import type { State } from '@//:types/upload';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Heading,
  Text,
} from '@chakra-ui/react';
import FullPost from '@//:modules/content/posts/full/FullPost';
import { useTranslation } from 'react-i18next';

type Props = {
  state: State,
  disabled: boolean,
};

export default function Review({ state, disabled }: Props): Node {
  const [t] = useTranslation('upload');

  return (
    <>
      <Heading fontSize="3xl" color="gray.00">
        {t('review.header')}
      </Heading>
      <Text fontSize="lg" mt={2} color="gray.100">
        {t('review.subheader')}
      </Text>
      <FullPost data={state} />
      <>
        {disabled && (
          <Alert mt={4} borderRadius={5}>
            <AlertIcon />
            {t('review.notice')}
            <AlertDescription />
          </Alert>
        )}
      </>
    </>
  );
}
