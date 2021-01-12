import { Button as ThemeUIButton } from 'theme-ui';

const Button = props => (
  <ThemeUIButton
    {...props}
    sx={{
      borderWidth: 'defaults',
      borderStyle: 'solid',
      pl: 6,
      pr: 6,
      fontSize: 2,
      fontWeight: 'bold',
      fontFamily: 'heading',
      borderRadius: 'defaults',
      ...props.sx,
    }}
  />
);

export default Button;
