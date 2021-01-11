import { Input } from 'theme-ui';

export default props => (
  <Input
    {...props}
    sx={{
      pl: 3,
      pr: 3,
      fontSize: 2,
      fontWeight: 'body',
      fontFamily: 'body',
      borderRadius: 'defaults',
      ...props.sx,
    }}
  />
);
