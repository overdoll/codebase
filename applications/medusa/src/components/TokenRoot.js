import { usePreloadedQuery } from 'react-relay/hooks';
import { TokenQuery } from '../queries/token';

export default function TokenRoot(props) {
  const result = usePreloadedQuery(
    TokenQuery,
    props.prepared.queries.tokenQuery,
  );
  console.log(result);
  return null;
}
