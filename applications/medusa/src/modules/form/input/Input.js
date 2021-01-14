import { Input as ThemeUIInput } from 'theme-ui';

const Input = ({ sx, register, validation, ...rest }) => (
  <ThemeUIInput
    {...rest}
    ref={register(validation)}
    sx={{
      pl: 3,
      pr: 3,
      fontSize: 2,
      fontWeight: 'body',
      fontFamily: 'body',
      borderRadius: 'defaults',
      ...sx,
    }}
  />
);

export default Input;
