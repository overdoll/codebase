import { usePreloadedQuery } from 'react-relay/hooks';
import { TokenQuery } from '../queries/token';
import Register from './Register';

export default function TokenRoot(props) {
  const result = usePreloadedQuery(
    TokenQuery,
    props.prepared.queries.tokenQuery,
  );

  if (result.redeemCookie) {
    if (!result.redeemCookie.sameSession) {
      return 'other session';
    }

    if (!result.redeemCookie.registered) {
      return <Register {...props} />;
    }

    return 'redirect';
  }

  return null;
}
