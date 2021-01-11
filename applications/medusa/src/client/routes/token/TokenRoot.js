import { usePreloadedQuery } from 'react-relay/hooks';
import { TokenQuery } from '../../queries/token';
import Register from '../join/components/Register';

export default function TokenRoot(props) {
  const result = usePreloadedQuery(TokenQuery, props.prepared.tokenQuery);

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
