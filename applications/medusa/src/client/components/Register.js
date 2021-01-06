import { graphql, useMutation } from 'react-relay/hooks'
import { useState } from 'react'

const registerAction = graphql`
  mutation RegisterMutation($username: String!) {
    register(username: $username) {
      username
    }
  }
`

export default function Register (props) {
  const [commit, isInFlight] = useMutation(registerAction)

  const [username, setUserName] = useState('')

  const onChange = event => {
    setUserName(event.target.value)
  }

  const onSubmit = async event => {
    event.preventDefault()
    await commit({
      variables: {
        username: username
      },
      onCompleted (data) {
        console.log(data)
      },
      onError (data) {
        console.log(data)
      }
    })
  }

  return (
    <>
      register
      <form onSubmit={onSubmit}>
        <input
          disabled={isInFlight}
          required
          type="text"
          value={username}
          onChange={onChange}
        />
        <input disabled={isInFlight} type="submit" value="Submit" />
      </form>
    </>
  )
}
