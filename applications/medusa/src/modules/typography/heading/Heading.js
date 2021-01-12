import { Heading as ThemeUIHeading } from 'theme-ui';

const Heading = props => (
  <ThemeUIHeading
    {...props}
    sx={{
      ...props.sx,
    }}
  />
);

export default Heading;
