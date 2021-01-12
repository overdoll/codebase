import { Text as ThemeUIText } from 'theme-ui';

const Text = props => <ThemeUIText {...props} sx={{ ...props.sx }} />;

export default Text;
