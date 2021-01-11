import { Button } from 'theme-ui';

export default props => (
  <Button
    {...props}
    sx={{
      borderWidth: 'default',
      borderStyle: 'solid',
      pl: 6,
      pr: 6,
      fontSize: 2,
      fontWeight: 'bold',
      fontFamily: 'heading',
      borderRadius: 'default',
      ...props.sx,
    }}
  />
);
