import { graphql, useMutation } from 'react-relay/hooks';
import { useState } from 'react';

const joinAction = graphql`
  mutation JoinRootMutation($email: String!) {
    authenticate(email: $email) {
      success
    }
  }
`;

export default function JoinRoot({ props }) {
  const [commit, isInFlight] = useMutation(joinAction);

  const [email, setEmail] = useState('');

  const onChange = event => {
    setEmail(event.target.value);
  };

  const onSubmit = async event => {
    event.preventDefault();
    await commit({
      variables: {
        email: email,
      },
      onCompleted(data) {
        console.log(data);
      },
      onError(data) {
        console.log(data);
      },
    });
  };

  if (isInFlight) {
    return 'Loading!';
  }

  return (
    <form onSubmit={onSubmit}>
      <input required type="text" value={email} onChange={onChange} />
      <input type="submit" value="Submit" />
    </form>
  );
}
