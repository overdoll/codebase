/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks';
import { Button, Form, Input, useForm } from '@//:modules/form';

import { Frame } from '@//:modules/content';
import { useNotify } from '@//:modules/focus';
import { useTranslation } from 'react-i18next';
import type { RegisterMutation } from '@//:artifacts/RegisterMutation.graphql';
import type { Node } from 'react';
import { useHistory } from '@//:modules/routing';
import Icon from '@//:modules/content/icon/Icon';
import SignShapes from '@streamlinehq/streamline-regular/lib/maps-navigation/SignShapes';

const RegisterMutationGQL = graphql`
  mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data)
  }
`;

export default function Register(): Node {
  const [commit, isInFlight] = useMutation<RegisterMutation>(
    RegisterMutationGQL,
  );
  const instance = useForm();
  const notify = useNotify();
  const [t] = useTranslation('auth');

  const history = useHistory();

  const onSubmit = val => {
    commit({
      variables: {
        data: {
          username: val.username,
        },
      },
      onCompleted(data) {
        history.replace('/profile');
      },
      onError(data) {
        notify.error(t('register.error'));
      },
    });
  };

  return (
    <Frame>
      <Icon
        icon={SignShapes.SignBadgeCircle}
        strokeWidth={2.5}
        stroke={'primary.500'}
        size={80}
        sx={{
          display: 'block',
          pb: 7,
          pt: 6,
          textAlign: 'center',
        }}
      />
      <Form instance={instance} onSubmit={onSubmit}>
        <Input
          title={t('register.form.username.title')}
          placeholder={t('register.form.username.placeholder')}
          name="username"
          validation={{ required: true }}
          type="text"
        />
        <Button
          variant={['huge']}
          sx={{ width: '100%', variant: 'buttons.primary.regular', mt: 2 }}
          loading={isInFlight}
        >
          {t('register.form.submit')}
        </Button>
      </Form>
    </Frame>
  );
}
