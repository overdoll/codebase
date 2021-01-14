import { graphql, useMutation } from 'react-relay/hooks';
import { Button, Input, useForm } from '@//:modules/form';

const RegisterMutation = graphql`
  mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data)
  }
`;

export default function Register(props) {
  const [commit, isInFlight] = useMutation(RegisterMutation);
  const { register, handleSubmit } = useForm();

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
        console.log(data);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        sx={{ variant: 'forms.input.primary' }}
        register={register}
        validation={{ required: true }}
        disabled={isInFlight}
        type="text"
      />
      <Button
        sx={{ width: '100%', variant: 'primary', mt: 2 }}
        disabled={isInFlight}
      >
        register
      </Button>
    </form>
  );
}
