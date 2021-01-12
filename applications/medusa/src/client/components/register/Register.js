import { graphql, useMutation } from 'react-relay/hooks';
import { useState } from 'react';
import { Button, Input } from '@//:modules/form';

const RegisterMutation = graphql`
  mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data)
  }
`;

export default function Register(props) {
  const [commit, isInFlight] = useMutation(RegisterMutation);

  const [username, setUserName] = useState('');

  const onChange = event => {
    setUserName(event.target.value);
  };

  const onSubmit = async event => {
    event.preventDefault();
    await commit({
      variables: {
        data: {
          username: username,
        },
      },
      onCompleted(data) {
        console.log(data);
        console.log('registered');
      },
      onError(data) {
        console.log(data);
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        sx={{ variant: 'forms.input.primary' }}
        disabled={isInFlight}
        required
        type="text"
        value={username}
        onChange={onChange}
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
