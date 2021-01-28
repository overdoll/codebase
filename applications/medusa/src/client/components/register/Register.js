import { graphql, useMutation } from 'react-relay/hooks';
import { Button, Form, Input, useForm } from '@//:modules/form';
import { Frame } from '@//:modules/content';
import { useNotify } from '@//:modules/focus';
import { useTranslation } from 'react-i18next';

const RegisterMutation = graphql`
  mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data)
  }
`;

export default function Register(props) {
  const [commit, isInFlight] = useMutation(RegisterMutation);
  const instance = useForm();
  const notify = useNotify();
  const [t] = useTranslation('auth');

  const onSubmit = async val => {
    await commit({
      variables: {
        data: {
          username: val.username,
        },
      },
      onCompleted(data) {
        console.log(data);
      },
      onError(data) {
        notify.error(t('register.error'));
      },
    });
  };

  return (
    <Frame>
      <Form instance={instance} onSubmit={onSubmit}>
        <Input
          title={t('register.form.username.title')}
          placeholder={t('register.form.username.placeholder')}
          name="username"
          validation={{ required: true }}
          type="text"
        />
        <Button
          sx={{ width: '100%', variant: 'primary', mt: 2 }}
          loading={isInFlight}
        >
          {t('register.form.submit')}
        </Button>
      </Form>
    </Frame>
  );
}
