import { Input as ThemeUIInput } from 'theme-ui';

const Input = props => (
  <ThemeUIInput
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

export default Input;
